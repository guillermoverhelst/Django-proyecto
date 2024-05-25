from django.urls import path
from . import views

urlpatterns= [
    path("listar/",views.listarTipoCine),
    path("buscartipocine/",views.buscarTipoCine),
]