# 📂 ESTRUTURA DE ARQUIVOS - ai.Judge Landing Page

## Visualização Completa da Estrutura

```
seu_projeto_django/
│
├── 📁 core/                                    # App Django da landing page
│   │
│   ├── 📁 migrations/                          # Migrações do Django
│   │   └── __init__.py
│   │
│   ├── 📁 static/                              # Arquivos estáticos do app
│   │   └── 📁 core/
│   │       ├── 📁 css/
│   │       │   └── styles.css                  # ⭐ Estilos da landing page
│   │       └── 📁 js/
│   │           └── script.js                   # ⭐ JavaScript interativo
│   │
│   ├── 📁 templates/                           # Templates do app
│   │   └── 📁 core/
│   │       └── landing.html                    # ⭐ HTML da landing page
│   │
│   ├── __init__.py                             # Marca o diretório como pacote Python
│   ├── apps.py                                 # ⭐ Configuração do app
│   ├── urls.py                                 # ⭐ URLs do core
│   └── views.py                                # ⭐ Views (landing_page)
│
├── 📁 seu_projeto/                             # Pasta de configuração principal
│   ├── __init__.py
│   ├── settings.py                             # 🔧 Configure INSTALLED_APPS aqui
│   ├── urls.py                                 # 🔧 Configure rotas principais aqui
│   ├── wsgi.py
│   └── asgi.py
│
├── 📁 staticfiles/                             # Arquivos estáticos coletados (collectstatic)
│
├── manage.py                                   # Script de gerenciamento Django
│
└── 📄 README.md                                # 📖 Documentação completa

```

## Arquivos Principais

### 1. core/views.py
```python
# Contém a view que renderiza a landing page
def landing_page(request):
    return render(request, 'core/landing.html')
```

### 2. core/urls.py
```python
# Define a rota para a landing page na raiz ('/')
urlpatterns = [
    path('', views.landing_page, name='landing'),
]
```

### 3. core/templates/core/landing.html
```html
<!-- Template Django com {% load static %} e {% url %} tags -->
<!-- Contém toda a estrutura HTML da landing page -->
```

### 4. core/static/core/css/styles.css
```css
/* Estilos CSS com variáveis, animações e responsividade */
/* Paleta de cores: Dourado (#D4AF37) + Azul Marinho (#0A0E1A) */
```

### 5. core/static/core/js/script.js
```javascript
// JavaScript para interatividade:
// - Menu mobile
// - Scroll suave
// - Animações
// - Demo da IA
```

## Configurações Necessárias

### 📝 No arquivo: seu_projeto/settings.py

```python
# 1. Adicionar core aos apps instalados
INSTALLED_APPS = [
    ...
    'core',  # <-- ADICIONE
]

# 2. Configurar arquivos estáticos
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```

### 📝 No arquivo: seu_projeto/urls.py

```python
# Incluir as URLs do core na raiz
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),  # <-- ADICIONE
]
```

## Comandos de Instalação

```bash
# 1. Navegar até o diretório do projeto
cd seu_projeto_django/

# 2. Copiar a pasta 'core' para este diretório
# (ao lado de manage.py)

# 3. Configurar settings.py e urls.py (veja acima)

# 4. Executar migrações
python manage.py migrate

# 5. (Opcional) Coletar arquivos estáticos
python manage.py collectstatic

# 6. Iniciar servidor
python manage.py runserver

# 7. Acessar no navegador
# http://127.0.0.1:8000/
```

## Fluxo de Requisição

```
1. Usuário acessa: http://127.0.0.1:8000/
                   ↓
2. Django procura em: seu_projeto/urls.py
                   ↓
3. Encontra: path('', include('core.urls'))
                   ↓
4. Busca em: core/urls.py
                   ↓
5. Encontra: path('', views.landing_page)
                   ↓
6. Executa: core/views.py → landing_page()
                   ↓
7. Renderiza: core/templates/core/landing.html
                   ↓
8. Carrega CSS: core/static/core/css/styles.css
                   ↓
9. Carrega JS: core/static/core/js/script.js
                   ↓
10. Exibe landing page no navegador
```

## URLs Usadas no Template

A landing page usa estas URLs do Django:

```python
# No template landing.html
{% url 'login' %}      # Link para página de login
{% url 'register' %}   # Link para página de registro
{% url 'landing' %}    # Link para a própria landing page

# Se essas URLs não existirem, substitua por '#' temporariamente
<a href="#" class="btn-nav-login">Entrar</a>
```

## Arquivos Estáticos

O Django procura arquivos estáticos em:

```
core/static/core/
├── css/
│   └── styles.css    → {% static 'core/css/styles.css' %}
└── js/
    └── script.js     → {% static 'core/js/script.js' %}
```

## Seções da Landing Page

1. **Navigation** - Menu fixo no topo
2. **Hero** - Seção principal com CTA
3. **Features** - 6 recursos do produto
4. **Testimonials** - Depoimentos de clientes
5. **IA Section** - Benefícios da IA + Demo
6. **About** - Sobre a empresa
7. **CTA** - Call-to-action final
8. **Footer** - Rodapé com links

## Responsividade

A landing page é totalmente responsiva:

- **Desktop**: Layout completo em 2 colunas
- **Tablet**: Layout adaptado
- **Mobile**: Layout em 1 coluna com menu hamburger

Breakpoints principais:
- 1024px - Layout de tablet
- 768px - Layout mobile

---

✨ **Pronto para usar!** Siga o README.md para instruções detalhadas.
