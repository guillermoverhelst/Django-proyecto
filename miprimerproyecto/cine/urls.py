from django.urls import path

from . import views
urlpatterns=[
    path("listar/", views.listar),
    path("listarcine/", views.listarCineAsincrono),
    path("buscarcinepornombre/",views.buscarCineAsincrono),
    path("guardarcine/", views.guardarCine),
    path("recuperarcine/", views.buscarCinePorId),
    path("listartipocine/",views.listartipocine),
    path("eliminarcine/", views.eliminarcine),
    path("buscarfuncionporcine/",views.buscarfuncionporcine)

]