from . import views
from django.urls import path

urlpatterns = [
    path("paginatipousuariohtml/", views.paginatipousuariohtml),
    path("listar/", views.listar),
    path("filtrar/", views.filtrar),
    path("editar/",views.editar),
    path("listarboton/",views.listarboton),
    path("recuperarboton/",views.recuperarboton),
    path("guardar/",views.guardar)

]