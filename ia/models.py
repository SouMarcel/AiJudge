from django.db import models
from usuarios.models import Cliente
from usuarios.models import Documentos

class Pergunta(models.Model):
    pergunta = models.TextField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)

    def __str__(self):
        return self.pergunta

class ContextRag(models.Model):
    content = models.JSONField()
    tool_name = models.CharField(max_length=255)
    tool_args = models.JSONField(null=True, blank=True)
    pergunta = models.ForeignKey(Pergunta, on_delete=models.CASCADE)

    def __str__(self):
        return self.tool_name
    
class AnaliseJurisprudencia(models.Model):
    documento = models.ForeignKey(Documentos, on_delete=models.CASCADE, related_name='analises')
    indice_risco = models.IntegerField()
    classificacao = models.CharField(max_length=20)  # Baixo, Médio, Alto, Crítico
    erros_coerencia = models.JSONField(default=list)
    riscos_juridicos = models.JSONField(default=list)
    problemas_formatacao = models.JSONField(default=list)
    red_flags = models.JSONField(default=list)
    tempo_processamento = models.IntegerField(default=0)  # em segundos
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-data_criacao']

    def __str__(self):
        return f"Análise - {self.documento.get_tipo_display()} - {self.data_criacao.strftime('%d/%m/%Y %H:%M')}"