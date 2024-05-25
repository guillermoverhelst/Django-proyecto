from django.shortcuts import render
from webconfig.query import SQL
# Create your views here.
from django.http import HttpResponse
import json
def listar(request):
    return render(request,"pelicula/pelicula.html",None)

def listarPelicula(request):
    sql = SQL()
    listardatos = sql.listar_json("exec uspListarPelicula")
    return HttpResponse(json.dumps(listardatos))

def listargenerojson(request):
    sql = SQL()
    listardatos = sql.listar_json("exec uspListarGenero")
    return HttpResponse(json.dumps(listardatos))

def listarcensurajson(request):
    sql = SQL()
    listardatos = sql.listar_json("exec uspListarTipoCensura")
    return HttpResponse(json.dumps(listardatos))

def recuperarpelicula(request):
    sql = SQL()
    idpelicula = request.GET.get("idpelicula")
    listardatos = sql.listar_json("exec uspRecuperarPelicula @idpelicula ='{0}'".format(idpelicula))
    return HttpResponse(json.dumps(listardatos))


def guardarpelicula(request):
    sql = SQL()
    objeto = json.loads(request.body.decode("utf-8"))
    idpelicula = objeto["idpelicula"]
    titulo = objeto["titulo"]
    idgenero = objeto["idgenero"]
    idpais = objeto["idpais"]
    sinopsis = objeto["sinopsis"]
    duracion = objeto["duracion"]
    idtipocensura = objeto["idtipocensura"]
    foto = objeto["foto"]
    fechaestreno = objeto["fechaestreno"]

    registros = sql.enviarPost("exec uspGuardarPelicula @idpelicula= '{0}', @titulo ='{1}', @idgenero='{2}', "
                               "@idpais='{3}', @sinopsis ='{4}', @duracion='{5}', @idtipocensura='{6}', @foto='{7}', "
                               "@fechaestreno='{8}'".format(idpelicula, titulo, idgenero, idpais, sinopsis,duracion,idtipocensura,foto,fechaestreno))
    return HttpResponse(registros)


def eliminarpelicula(request):
    idpelicula=request.GET.get("idpelicula")
    sql = SQL()
    nregistros=sql.enviarPost("exec uspEliminarPelicula @idpelicula='{0}'".format(idpelicula))
    return HttpResponse(nregistros)
