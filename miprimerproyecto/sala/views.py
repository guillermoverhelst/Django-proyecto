import json

from django.shortcuts import render
from django.http import HttpResponse
from webconfig.query import SQL
# Create your views here.

def listarsala(request):
    return render(request,"sala/sala.html",None)

def listarsalajson(request):
    sql = SQL()
    lista = sql.listar_json("exec uspListarSala")
    return HttpResponse(json.dumps(lista))

def filtrarsala(request):
    sql = SQL()
    idcine = request.GET.get("idcine")
    lista = sql.listar_json("exec uspFiltrarSalaPorNombre @idcine='{0}'".format(idcine))
    return HttpResponse(json.dumps(lista))

def recuperarsala(request):
    sql = SQL()
    idsala = request.GET.get("idsala")
    lista = sql.listar_json("exec uspRecuperarSala @idsala='{0}'".format(idsala))
    return HttpResponse(json.dumps(lista))

def guardarsala(request):
    sql=SQL()
    objeto = json.loads(request.body.decode("utf-8"))
    idsala = objeto["idsala"]
    nombre = objeto["nombre"]
    idcine = objeto["idcine"]
    numerocolumnas = objeto["numerocolumnas"]
    numerofilas = objeto["numerofilas"]

    registros = sql.enviarPost("exec uspGuardarSala @idsala= '{0}', @idcine ='{1}', @numerofilas='{2}', "
                               "@numerocolumnas='{3}', @nombre ='{4}'".format(idsala, idcine, numerofilas,
                                                                              numerocolumnas, nombre))
    return HttpResponse(registros)

def eliminarsala(request):
    idsala = request.GET.get("idsala")
    sql = SQL()
    respuesta = sql.enviarPost("exec uspEliminarSala @idsala='{0}'".format(idsala))
    return HttpResponse(respuesta)