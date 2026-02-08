from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from usuarios.models import Cliente
from .models import Pergunta, ContextRag
from django.http import JsonResponse, StreamingHttpResponse
from .agents import JuriAi, SecretariaAI
from typing import Iterator
from agno.agent import RunOutputEvent, RunEvent
from .models import AnaliseJurisprudencia, Documentos
from agno.agent import RunOutput
from .wrapper_evolution_api import SendMessage

@csrf_exempt
def chat(request, id):
    cliente = Cliente.objects.get(id=id)
    if request.method == 'GET':
        return render(request, 'chat.html', {'cliente': cliente})
    elif request.method == 'POST':
        pergunta = request.POST.get('pergunta')
        pergunta_model = Pergunta(pergunta=pergunta, cliente=cliente)
        pergunta_model.save()
        return JsonResponse({'id': pergunta_model.id})

@csrf_exempt
def stream_resposta(request):
    id_pergunta = request.POST.get('id_pergunta')
    pergunta = get_object_or_404(Pergunta, id=id_pergunta)

    def gerar_resposta():
        agent = JuriAi.build_agent()
        stream: Iterator[RunOutputEvent] = agent.run(pergunta.pergunta, stream=True, stream_events=True)
        for chunk in stream:
            if chunk.event == RunEvent.run_content:
                yield str(chunk.content)
            if chunk.event == RunEvent.tool_call_completed:
                context = ContextRag(content=chunk.tool.result, tool_name=chunk.tool.tool_name, tool_args=chunk.tool.tool_args, pergunta=pergunta)
                context.save()

    response = StreamingHttpResponse(
        gerar_resposta(),
        content_type='text/plain; charset=utf-8'
    )
    response['Cache-Control'] = 'no-cache'
    response['X-Accel-Buffering'] = 'no'

    return response

def ver_referencias(request, id):
    pergunta = get_object_or_404(Pergunta, id=id)
    contextos = ContextRag.objects.filter(pergunta=pergunta)
    return render(request, 'ver_referencias.html', {
        'pergunta': pergunta,
        'contextos': contextos
    })

def analise_jurisprudencia(request, id):
    documento = get_object_or_404(Documentos, id=id)
    analise = AnaliseJurisprudencia.objects.filter(documento=documento).first()
    return render(request, 'analise_jurisprudencia.html', {
        'documento': documento,
        'analise': analise
    })

from usuarios.models import Documentos
from ia.agent_langchain import JurisprudenciaAI
from .models import AnaliseJurisprudencia
from django.shortcuts import redirect
from django.contrib import messages
from django.contrib.messages import constants
import time

def processar_analise(request, id):
    if request.method != 'POST':
        messages.add_message(request, constants.ERROR, 'Método não permitido.')
        return redirect('analise_jurisprudencia', id=id)
    
    try:
        documento = get_object_or_404(Documentos, id=id)
        start_time = time.time()
        
        agent = JurisprudenciaAI()
        response = agent.run(documento.content)
        
        processing_time = int(time.time() - start_time)
        
        indice = response.indice_risco
        if indice <= 30:
            classificacao = "Baixo"
        elif indice <= 60:
            classificacao = "Médio"
        elif indice <= 80:
            classificacao = "Alto"
        else:
            classificacao = "Crítico"
        
        analise, created = AnaliseJurisprudencia.objects.update_or_create(
            documento=documento,
            defaults={
                'indice_risco': indice,
                'classificacao': classificacao,
                'erros_coerencia': response.erros_coerencia,
                'riscos_juridicos': response.riscos_juridicos,
                'problemas_formatacao': response.problemas_formatacao,
                'red_flags': response.red_flags,
                'tempo_processamento': processing_time
            }
        )
        
        if created:
            messages.add_message(request, constants.SUCCESS, 'Análise realizada e salva com sucesso!')
        else:
            messages.add_message(request, constants.SUCCESS, 'Análise atualizada com sucesso!')
        
        return redirect('analise_jurisprudencia', id=id)
    except Exception as e:
        messages.add_message(request, constants.ERROR, f'Erro ao processar análise: {str(e)}')
        return redirect('analise_jurisprudencia', id=id)
    
import json

@csrf_exempt
def webhook_whatsapp(request):
    data = json.loads(request.body)
    phone = data.get('data').get('key').get('remoteJid').split('@')[0]
    message = data.get('data').get('message').get('extendedTextMessage').get('text')
    agent = SecretariaAI.build_agent(session_id=phone)
    response: RunOutput = agent.run(message)
    return JsonResponse({'response': response.content})
    send_message = SendMessage().send_message('Arcane3', {'number': phone, 'textMessage': {'text': response}})

