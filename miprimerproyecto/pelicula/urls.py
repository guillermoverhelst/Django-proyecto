from django.urls import path
from . import views
urlpatterns=[
    path("listar/",views.listar),
    path("listarPelicula/",views.listarPelicula),
    path("listargenerojson/", views.listargenerojson),
    path("listartipocensurajson/", views.listarcensurajson),
    path("recuperarpelicula/",views.recuperarpelicula),
    path("guardarpelicula/",views.guardarpelicula),
    path("eliminarpelicula/", views.eliminarpelicula)

]