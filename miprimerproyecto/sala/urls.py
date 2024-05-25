from . import views

from django.urls import path
urlpatterns = [
    path("listar/",views.listarsala),
    path("listarsala/", views.listarsalajson),
    path("filtrarsala/", views.filtrarsala),
    path("recuperarsala/",views.recuperarsala),
    path("guardarsala/",views.guardarsala),
    path("eliminarsala/",views.eliminarsala)

]