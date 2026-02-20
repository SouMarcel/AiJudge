from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.messages import constants
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib import auth
from .models import Cliente, Documentos
from ia.agents import JuriAi
from django.contrib.auth.decorators import login_required


def cadastro(request):
    if request.method == 'GET':
        return render(request, 'cadastro.html')
    elif request.method == 'POST':
        username = request.POST.get('username')
        senha = request.POST.get('senha')
        confirmar_senha = request.POST.get('confirmar_senha')

        if not senha == confirmar_senha:
            messages.add_message(request, constants.ERROR, 'Senha e confirmar senha não são iguais.')
            return redirect('cadastro')
        
        if len(senha) < 6:
            messages.add_message(request, constants.ERROR, 'Sua senha deve ter pelo meno 6 caracteres.')
            return redirect('cadastro')
        
        users = User.objects.filter(username=username)
        
        if users.exists():
            messages.add_message(request, constants.ERROR, 'Já existe um usuário com esse username.')
            return redirect('cadastro')
        
        User.objects.create_user(
            username=username,
            password=senha
        )

        return redirect('login')

def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        username = request.POST.get('username')
        senha = request.POST.get('senha')

        user = authenticate(username=username, password=senha)
        if user is not None:
            auth.login(request, user)
            return redirect('clientes')
        else:
            messages.add_message(request, constants.ERROR, 'Usuário ou senha inválidos.')
            return redirect('login')
        

@login_required
def clientes(request):
    if request.method == 'GET':
        clientes = Cliente.objects.filter(user=request.user)
        clientes_ativos = clientes.filter(status=True).count()
        clientes_inativos = clientes.filter(status=False).count()
        clientes_vip = clientes.filter(is_vip=True).count()
        return render(request, 'clientes.html', {
            'clientes': clientes,
            'clientes_ativos': clientes_ativos,
            'clientes_inativos': clientes_inativos,
            'clientes_vip': clientes_vip
        })
    elif request.method == 'POST':
        nome = request.POST.get('nome')
        email = request.POST.get('email')
        tipo = request.POST.get('tipo')
        status = request.POST.get('status') == 'on'
        telefone = request.POST.get('telefone')
        cpf_cnpj = request.POST.get('cpf_cnpj')
        is_vip = request.POST.get('is_vip') == 'on'

        Cliente.objects.create(
            nome=nome,
            email=email,
            tipo=tipo,
            status=status,
            user=request.user,
            telefone=telefone,
            cpf_cnpj=cpf_cnpj,
            is_vip=is_vip
        )

        messages.add_message(request, constants.SUCCESS, 'Cliente cadastrado com sucesso!')
        return redirect('clientes')

def cliente(request, id):
    cliente = Cliente.objects.get(id=id)
    if request.method == 'GET':
        documentos = Documentos.objects.filter(cliente=cliente)
        return render(request, 'cliente.html', {'cliente': cliente, 'documentos': documentos})
    elif request.method == 'POST':
        tipo = request.POST.get('tipo')
        documento = request.FILES.get('documento')
        data = request.POST.get('data')
        
        documentos = Documentos(
            cliente=cliente,
            tipo=tipo,
            arquivo=documento,
            data_upload=data
        )

        documentos.save()

        return redirect(reverse('cliente', kwargs={'id': cliente.id}))
    
