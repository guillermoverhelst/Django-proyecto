from django.urls import path
from . import views

urlpatterns=[
    path("listar/",views.listar),
    path("login/",views.login),
    path("agregarusuario/",views.agregarusuario),
    path("listatipousuario/",views.listatipousuario),
    path("guardarusuario/",views.guardarusuario),
    path("listarusuarioasincrono/",views.listarusuarioasincrono),
    path("recuperarusuario/",views.recuperarusuario)

]