from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("servicios/", views.services, name="services"),
    path("robots.txt", views.robots_txt, name="robots"),
    path("sitemap.xml", views.sitemap_xml, name="sitemap"),
]
