from django.urls import path
from . import views

urlpatterns=[
    path("listar/",views.listar),
    path("verbutacas/",views.verbutacas),
    path("buscarbutacas/",views.buscarbutacas),
    path("ocuparbutaca/",views.ocuparbutaca)
]