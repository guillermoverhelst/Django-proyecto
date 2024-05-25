from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
import json

def listar(request):
    return render(request,"butaca/butaca.html",{

    })

def verbutacas(request):
    idfuncion = request.GET.get("idfuncion")
    return render(request, "butaca/verButacas.html", {
        "idfuncion":idfuncion
    })

def buscarbutacas(request):
    idfuncion = request.GET.get("idfuncion")
    sql = SQL()
    lista = sql.listar_json("exec uspRecuperarButacas @idfuncion='{0}'".format(idfuncion))
    return HttpResponse(json.dumps(lista))


def ocuparbutaca(request):
    idfuncion = request.GET.get("idfuncion")
    idbutaca = request.GET.get("idbutaca")
    sql = SQL()
    respuesta = sql.enviarPost("exec uspOcuparButaca @idfuncion = '{0}', @idbutaca ='{1}'".format(idfuncion,idbutaca))
    return HttpResponse(respuesta)