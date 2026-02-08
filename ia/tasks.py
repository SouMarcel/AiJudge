from usuarios.models import Documentos
from django.shortcuts import get_object_or_404
from .agents import JuriAi

def ocr_and_markdown_file(instance_id):
    from docling.document_converter import DocumentConverter

    documentos = get_object_or_404(Documentos, id=instance_id)
    print(1)
    converter = DocumentConverter()
    result = converter.convert(documentos.arquivo.path)
    doc = result.document
    print('1.5')
    texto = doc.export_to_markdown()
    print(2)
    documentos.content = texto
    documentos.save()
    print(3)

def rag_documentos(instance_id):
    documentos = get_object_or_404(Documentos, id=instance_id)
    JuriAi.knowledge.insert(
        name=documentos.arquivo.name,
        text_content=documentos.content,
        metadata={
            'cliente_id': documentos.cliente.id,
            'name': documentos.arquivo.name
        }
    )
