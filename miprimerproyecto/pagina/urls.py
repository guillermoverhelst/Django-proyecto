from . import views
from django.urls import path

urlpatterns = [
    path("listarasincrono/", views.listarasincrono),
    path("listar/", views.listar),
    path("listarpagina/",views.listarpagina)

]