"""
URL configuration for miprimerproyecto project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('', views.login),
    path('inicio/', views.saludo),
    path('lobby/', views.mi_primera_pagina),
    path('pais/', include('pais.urls')),
    path('tipocine/',include('tipocine.urls')),
    path('cine/',include('cine.urls')),
    path('persona/', include('persona.urls')),
    path('pelicula/',include('pelicula.urls')),
    path('sala/', include('sala.urls')),
    path('funcion/', include('funcion.urls')),
    path('butaca/', include('butaca.urls')),
    path('usuario/', include('usuario.urls')),
    path('botonpaginatipousuario/', include('botonpaginatipousuario.urls')),
    path('paginatipousuario/', include('paginatipousuario.urls')),
    path('pagina/',include('pagina.urls')),
    path('tipousuario/', include('tipousuario.urls')),
    path('boton/', include('boton.urls')),
    path('paginaprincipal/', include('paginaprincipal.urls')),

]
