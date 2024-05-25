import json

from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
# Create your views here.

def listar(request):
    return render(request,"cine/cine.html",{

    })

def listarCineAsincrono(request):
    sql = SQL()
    listado = sql.listar_json("exec uspListarCine")
    return  HttpResponse(json.dumps(listado))


def buscarCineAsincrono(request):
    nombre = request.GET.get("nombre")
    sql = SQL()
    listado = sql.listar_json("exec uspFiltrarCineDjango @nombre='{0}'".format(nombre))
    return HttpResponse(json.dumps(listado))

def buscarCinePorId(request):
    idcine=request.GET.get("idcine")
    sql = SQL()
    objeto = sql.listar_json("exec uspRecuperarCine @idcine='{0}'".format(idcine))
    return HttpResponse(json.dumps(objeto))

def guardarCine(request):
    objeto = json.loads(request.body.decode("utf-8"))
    idcine = objeto["idcine"]
    nombre = objeto["nombre"]
    direccion = objeto["direccion"]
    tipocine = objeto["tipocine"]
    fechaapertura = objeto["fechaapertura"]
    print(objeto)
    sql =SQL()
    registros= sql.enviarPost("exec uspGuardarCine @idcine='{0}', @nombre='{1}', @direccion='{2}', @idtipocine='{3}',"
                              " @fechaapertura='{4}'"
                              .format(idcine,nombre,direccion,tipocine,fechaapertura))
    return HttpResponse(registros)

def listartipocine(request):
    sql = SQL()
    listado = sql.listar_json("exec uspListarTipoCine")
    return HttpResponse(json.dumps(listado))


def eliminarcine(request):
    idcine=request.GET.get("idcine")
    print(idcine)
    sql =SQL()
    registros = sql.enviarPost("exec uspEliminarCine @idcine='{0}'".format(idcine))
    return HttpResponse(registros)


def buscarfuncionporcine(request):
    sql = SQL()
    idcine = request.GET.get("idcine")
    listado = sql.listar_json("exec uspBuscarFuncionPorCine @idcine='{0}' ".format(idcine))
    return HttpResponse(json.dumps(listado))