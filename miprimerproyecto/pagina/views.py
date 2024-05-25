import json

from django.shortcuts import render
from django.http import HttpResponse
from webconfig.query import SQL
def listarasincrono(request):
    sql = SQL()
    lista = sql.listar_json("exec uspListarPaginas")
    return HttpResponse(json.dumps(lista))

def listarpagina(request):
    sql = SQL()
    lista = sql.listar_json("exec uspListarPaginasDB")
    return HttpResponse(json.dumps(lista))

def listar(request):
    return render(request,"pagina/pagina.html",None)