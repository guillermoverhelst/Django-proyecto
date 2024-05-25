import json

from django.shortcuts import render
from django.http import HttpResponse
from webconfig.query import SQL

def listar(request):
    return render(request,"boton/boton.html",None)

def listarasincrono(request):
    sql = SQL()
    lista = sql.listar_json("exec uspListarBotonDB")
    return HttpResponse(json.dumps(lista))