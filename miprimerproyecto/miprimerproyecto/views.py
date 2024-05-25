from django.http import HttpResponse
from django.shortcuts import render

def saludo(request):
    return HttpResponse("Hola mundo")

def mi_primera_pagina(request):
    return render(request,"inicio.html",None)

def login(request):
    return render(request,"login/login.html",None)