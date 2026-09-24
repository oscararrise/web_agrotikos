# AgroTikos Web

Sitio corporativo de AgroTikos y DIMITRA, construido con Django templates, CSS moderno, JavaScript ES6 y animaciones progresivas con GSAP.

## Objetivo

Comunicar a AgroTikos como una empresa AgTech que construye infraestructura de datos para sistemas agropecuarios. El sitio presenta agricultura de precisión, ganadería conectada, acuicultura inteligente y DIMITRA como una capa transversal de captura, histórico, contexto, inteligencia y acción.

## Stack

- Python + Django
- Django Templates
- HTML5 / CSS3 / JavaScript ES6+
- GSAP + ScrollTrigger mediante CDN, con degradación funcional si el CDN no está disponible
- SQLite para desarrollo local
- Gunicorn + Nginx para producción

No hay dependencia obligatoria de Node.js.

## Ejecutar localmente

    python -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver

En Windows PowerShell:

    python -m venv .venv
    .venv\Scripts\Activate.ps1
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver

Abrir http://127.0.0.1:8000/.

## Variables de entorno

Copia .env.example como referencia y configura las variables desde el entorno del sistema o del servicio. Django no carga automáticamente un archivo .env; esto evita agregar una dependencia adicional y mantiene la configuración de producción explícita.

Variables principales:

- DJANGO_SECRET_KEY
- DJANGO_DEBUG
- DJANGO_ALLOWED_HOSTS
- DJANGO_CSRF_TRUSTED_ORIGINS
- DJANGO_SECURE_SSL_REDIRECT
- DJANGO_SECURE_HSTS_SECONDS

## Formulario de contacto

Los contactos se guardan en la tabla website_contactlead y pueden revisarse desde Django Admin. El formulario incluye validación backend y protección CSRF.

Para crear un usuario administrador:

    python manage.py createsuperuser

## Estáticos

En producción:

    python manage.py collectstatic --noinput

Nginx debe servir el directorio staticfiles/ directamente.

## Producción

Se incluyen ejemplos en deployment/agrotikos.service y deployment/nginx.conf.example.

Antes de desplegar:

1. Define un DJANGO_SECRET_KEY seguro.
2. Usa DJANGO_DEBUG=False.
3. Configura DJANGO_ALLOWED_HOSTS=agrotikos.com,www.agrotikos.com.
4. Configura DJANGO_CSRF_TRUSTED_ORIGINS=https://agrotikos.com,https://www.agrotikos.com.
5. Activa redirección HTTPS y HSTS únicamente cuando TLS esté correctamente configurado.
6. Ejecuta python manage.py check --deploy.
7. Ejecuta migraciones y collectstatic.

## Assets de equipo

La primera versión no inventa fotografías de integrantes. Los espacios de equipo están marcados para reemplazarse por fotografías oficiales con derecho de uso.
