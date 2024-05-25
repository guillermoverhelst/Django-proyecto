from . import views
from django.urls import path

urlpatterns = [
    path("listarasincrono/", views.listarasincrono),
    path("listar/",views.listar),
    path("agregartipousuario/",views.agregartipousuario),
    path("guardartipousuario/", views.guardartipousuario),
    path("editartipousuario/", views.editartipousuario),
    path("recuperartipousuario/", views.recuperartipousuario),
    path("recuperardetalletipousuario/", views.recuperardetalletipousuario),
    path("filtrartipousuariopornombre/", views.filtrartipousuariopornombre),
    path("eliminartipousuario/",views.eliminartipousuario)
]