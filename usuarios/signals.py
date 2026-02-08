from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Documentos
from ia.tasks import ocr_and_markdown_file, rag_documentos
from django_q.tasks import Chain

@receiver(post_save, sender=Documentos)
def post_save_documentos(sender, instance, created, **kwargs):
    if created:
        ocr_and_markdown_file(instance.id)
        rag_documentos(instance.id)