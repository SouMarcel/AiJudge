# 🏛️ ai.Judge - Landing Page Django

Landing page profissional e sofisticada para o SaaS ai.Judge - Plataforma de IA para advogados.

## 📁 Estrutura de Arquivos

```
seu_projeto/
├── core/
│   ├── __init__.py
│   ├── apps.py
│   ├── views.py
│   ├── urls.py
│   ├── templates/
│   │   └── core/
│   │       └── landing.html
│   └── static/
│       └── core/
│           ├── css/
│           │   └── styles.css
│           └── js/
│               └── script.js
├── seu_projeto/  (diretório do projeto principal)
│   ├── settings.py
│   └── urls.py
└── manage.py
```

## 🚀 Instalação Passo a Passo

### 1. Copiar os Arquivos

Copie toda a pasta `core` para o diretório raiz do seu projeto Django, ao lado do arquivo `manage.py`.

```bash
# A estrutura deve ficar assim:
# seu_projeto/
# ├── core/              <-- Cole aqui
# ├── seu_projeto/
# └── manage.py
```

### 2. Configurar o settings.py

Abra o arquivo `seu_projeto/settings.py` e faça as seguintes alterações:

#### 2.1. Adicionar 'core' ao INSTALLED_APPS

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    'core',  # <-- ADICIONE ESTA LINHA
]
```

#### 2.2. Verificar configuração de TEMPLATES

Certifique-se de que `APP_DIRS` está como `True`:

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,  # <-- Deve estar True
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

#### 2.3. Configurar STATIC_URL e STATIC_ROOT

```python
import os

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Opcional: se você tiver arquivos estáticos globais
# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'static'),
# ]
```

#### 2.4. Configurar idioma e timezone (opcional)

```python
LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Sao_Paulo'
```

### 3. Configurar o urls.py principal

Abra o arquivo `seu_projeto/urls.py` (o arquivo de URLs da raiz do projeto) e adicione:

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),  # <-- ADICIONE ESTA LINHA
]

# Para servir arquivos estáticos em desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

### 4. Criar URLs temporárias (se necessário)

Se você ainda não tem as páginas de login e registro, crie URLs temporárias ou remova os links no template.

**Opção 1: Criar arquivo `accounts/urls.py`** (se você tiver um app de contas):

```python
from django.urls import path
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('register/', views.register, name='register'),  # Implemente a view
]
```

**Opção 2: Editar o template temporariamente**

No arquivo `core/templates/core/landing.html`, substitua:

```html
<!-- De: -->
<a href="{% url 'login' %}" class="btn-nav-login">Entrar</a>
<a href="{% url 'register' %}" class="btn-nav-cta">Começar Grátis</a>

<!-- Para: -->
<a href="#" class="btn-nav-login">Entrar</a>
<a href="#" class="btn-nav-cta">Começar Grátis</a>
```

### 5. Executar Migrações

```bash
python manage.py migrate
```

### 6. Coletar Arquivos Estáticos (opcional em desenvolvimento)

```bash
python manage.py collectstatic
```

### 7. Iniciar o Servidor

```bash
python manage.py runserver
```

### 8. Acessar a Landing Page

Abra seu navegador e acesse:

```
http://127.0.0.1:8000/
```

## 🎨 Características da Landing Page

### Design
- ✨ **Estética jurídica premium**: Paleta dourada e azul marinho escuro
- 🎭 **Tipografia sofisticada**: Cormorant Garamond + Montserrat
- 🌊 **Animações fluidas**: Transições suaves e efeitos parallax
- 📱 **Totalmente responsivo**: Funciona em desktop, tablet e mobile

### Seções
1. **Hero**: Apresentação com badge, título impactante e CTAs
2. **Recursos**: 6 funcionalidades principais do produto
3. **Depoimentos**: Feedback de 3 advogados
4. **IA Jurídica**: 5 benefícios + demo interativo animado
5. **Sobre**: Missão, valores e visão da empresa
6. **CTA Final**: Call-to-action para conversão
7. **Footer**: Links e informações de compliance

### Funcionalidades JavaScript
- Menu mobile responsivo com hamburger
- Scroll suave entre seções
- Animações ao scroll (AOS)
- Contador animado de números
- Demo da IA com processo animado
- Efeito parallax no background
- Efeitos 3D nos cards
- Cursor personalizado (desktop)

## 🔧 Personalização

### Alterar Cores

Edite o arquivo `core/static/core/css/styles.css` na seção de variáveis:

```css
:root {
    --primary-gold: #D4AF37;
    --primary-gold-dark: #C9A961;
    --navy-dark: #0A0E1A;
    /* ... outras variáveis */
}
```

### Alterar Conteúdo

Edite o arquivo `core/templates/core/landing.html` e modifique o texto, imagens ou estrutura.

### Adicionar Novas Seções

1. Adicione o HTML no template `landing.html`
2. Adicione os estilos correspondentes no `styles.css`
3. Adicione animações/interações no `script.js` se necessário

## 📝 Checklist de Configuração

- [ ] Copiou a pasta `core` para o projeto
- [ ] Adicionou `'core'` ao `INSTALLED_APPS`
- [ ] Configurou `STATIC_URL` e `STATIC_ROOT`
- [ ] Verificou que `APP_DIRS = True` em TEMPLATES
- [ ] Adicionou `path('', include('core.urls'))` ao urls.py principal
- [ ] Configurou URLs de login/register ou removeu links temporariamente
- [ ] Executou `python manage.py migrate`
- [ ] Testou acessar `http://127.0.0.1:8000/`

## 🐛 Resolução de Problemas

### Página não carrega / 404

- Verifique se `'core'` está em `INSTALLED_APPS`
- Verifique se adicionou `path('', include('core.urls'))` no urls.py principal
- Certifique-se de que a estrutura de pastas está correta

### CSS não carrega

- Verifique se `STATIC_URL` está configurado
- Em desenvolvimento, certifique-se de que `DEBUG = True`
- Execute `python manage.py collectstatic` se em produção
- Limpe o cache do navegador (Ctrl+F5)

### Erro nas URLs 'login' ou 'register'

- Crie as views/URLs correspondentes no seu app de accounts
- Ou remova temporariamente os links no template (`href="#"`)

### Animações não funcionam

- Verifique se o arquivo `script.js` está sendo carregado corretamente
- Abra o console do navegador (F12) e veja se há erros
- Certifique-se de que o caminho do JavaScript está correto

## 📚 Recursos Adicionais

### Fontes Utilizadas
- **Cormorant Garamond**: Para títulos e elementos display
- **Montserrat**: Para corpo de texto e UI

Ambas são carregadas via Google Fonts e não precisam de instalação.

### Compatibilidade
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🎯 Próximos Passos

1. **Criar sistema de autenticação**: Implementar login e registro
2. **Integrar com backend**: Conectar formulários com API
3. **Adicionar analytics**: Google Analytics ou similar
4. **SEO**: Meta tags, sitemap, robots.txt
5. **Performance**: Otimizar imagens, minificar CSS/JS
6. **Testes**: Testar em diferentes navegadores e dispositivos

## 📞 Suporte

Se você encontrar problemas ou tiver dúvidas:

1. Verifique o checklist acima
2. Consulte a documentação do Django
3. Revise os arquivos de exemplo incluídos

## 📄 Licença

Este código é parte do projeto ai.Judge. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para revolucionar o Direito brasileiro**
