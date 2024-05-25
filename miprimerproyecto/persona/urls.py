from django.urls import path
from . import views

urlpatterns=[
    path("listar/",views.listarPersona),
    path("listarpersona/",views.listarPersonasincrona),
    path("buscarpersona/",views.buscarPersonasincrona),
    path("agregarpersona/",views.agregarpersona),
    path("guardarpersona/",views.guardarpersona),
    path("editarpersona/", views.editarpersona),
    path("listarpersonasinusuario/",views.listarPersonaSinUsuario)

]