from . import views
from django.urls import path

urlpatterns=[
    path("listar/",views.listafuncion),
    path("listarfuncion/", views.listarfuncion),
    path("filtrarfuncion/", views.filtarfuncion),
    path("guardarfuncion/",views.guardarfuncion),
    path("buscarsala/",views.buscarsala),
    path("recuperarfuncion/",views.recuperarfuncion),
    path("eliminarfuncion/",views.eliminarfuncion)


]