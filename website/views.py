from django.contrib import messages
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.urls import reverse
from django.views.decorators.http import require_http_methods

from .forms import ContactLeadForm


@require_http_methods(["GET", "POST"])
def home(request):
    form = ContactLeadForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Gracias. Recibimos tu mensaje y el contexto de tu operación.")
        return redirect(f"{reverse('home')}#contacto")

    return render(request, "website/index.html", {"form": form})


def services(request):
    return render(request, "website/services.html")


def robots_txt(request):
    content = "User-agent: *\nAllow: /\nSitemap: https://agrotikos.com/sitemap.xml\n"
    return HttpResponse(content, content_type="text/plain")


def sitemap_xml(request):
    content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://agrotikos.com/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://agrotikos.com/servicios/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
</urlset>"""
    return HttpResponse(content, content_type="application/xml")
