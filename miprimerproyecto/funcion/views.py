import json

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from webconfig.query import SQL

def listafuncion(request):
    return render(request,"funcion/funcion.html",None)

def listarfuncion(request):
    sql = SQL()
    lista = sql.listar_json("exec uspListarFuncion")
    return HttpResponse(json.dumps(lista))

def filtarfuncion(request):
    idpelicula = request.GET.get("idpelicula")
    sql = SQL()
    lista = sql.listar_json("exec uspFiltrarFuncion @idpelicula='{0}'".format(idpelicula))
    return HttpResponse(json.dumps(lista))

def guardarfuncion(request):
    sql = SQL()
    objeto = json.loads(request.body.decode("utf-8"))
    idfuncion=objeto["idfuncion"]
    fechafuncion=objeto["fechaformateada"]
    idpelicula=objeto["idpelicula"]
    idcine=objeto["idcine"]
    idsala=objeto["idsala"]
    print(idfuncion)
    print(fechafuncion)
    print(idpelicula)
    print(idcine)
    print(idsala)
    lista = sql.enviarTransaccion("exec uspGuardarFuncion @idfuncion='{0}', @fechafuncion='{1}' , @idpelicula ='{2}', "
                                  "@idcine='{3}', @idsala='{4}'".format(idfuncion,fechafuncion,idpelicula,idcine,idsala))
    return HttpResponse(lista)

def buscarsala(request):
    sql = SQL()
    idcine = request.GET.get("idcine")
    lista = sql.listar_json("exec uspLlenarSala @idcine = '{0}'".format(idcine))
    return HttpResponse(json.dumps(lista))


def recuperarfuncion(request):
    idfuncion = request.GET.get("idfuncion")
    sql =SQL()
    objeto = sql.listar_json("exec uspRecuperarFuncion @idfuncion='{0}'".format(idfuncion))
    return HttpResponse(json.dumps(objeto))


def eliminarfuncion(request):
    idfuncion = request.GET.get("idfuncion")
    sql = SQL()
    respuesta = sql.enviarPost("exec uspEliminarFuncion @idfuncion='{0}'".format(idfuncion))
    return HttpResponse(respuesta)