from django.urls import path
from . import views

urlpatterns= [
    path("listar/",views.listar),
    path("buscarpais/",views.buscarpais),
    path("agregarpais/",views.agregarpais),
    path("recuperarpais/", views.recuperarpais),
    path("listarjson/",views.listarjson),
    path("eliminarpais/", views.eliminarpais)

]