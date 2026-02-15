from django.shortcuts import render

def landing_page(request):
    """
    View para a landing page do ai.Judge
    """
    return render(request, 'core/landing.html')