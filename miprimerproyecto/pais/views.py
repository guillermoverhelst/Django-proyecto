from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
from django.http import HttpResponse
from webconfig.query import SQL
import json


def home(request):
    return HttpResponse("home")
def listar(request):
    """return render(request,"pais/pais.html",{
              "saludo":"Hola amigos",
              "dias": ["lunes","martes","miercoles"],
              "cursos": [{"curso":"c#","profesor":"guillermo","envivo":True},
                         {"curso":"java","profesor":"andres","envivo":False}],
          })"""
    sql = SQL()
    lista_pais = sql.listar_json("exec uspListarPais")
    return render(request,"pais/pais.html",{"listapais":lista_pais,"nombre":"" })


def listarjson(request):
    sql = SQL()
    lista_pais = sql.listar_json("exec uspListarPais")
    return HttpResponse(json.dumps(lista_pais))


def buscarpais(request):
    sql = SQL()
    nombre = request.POST.get("nombre").strip()
    if nombre == "" or nombre is None:
        filtrado_pais = sql.listar_json("exec uspListarPais")
    else:

        filtrado_pais = sql.listar_json("exec uspFiltrarPaisDjango @nombre={0}".format(nombre))
    return render(request, "pais/pais.html", {"listapais": filtrado_pais,"nombre":nombre})


def agregarpais(request):
    nombre = request.POST.get("nombre")
    idpais = request.POST.get("idpais")
    sql =SQL()
    registrosAfectados = sql.enviarPost("exec uspGuardarPais @idpais='{0}', @nombre = '{1}'".format(idpais,nombre))
    lista_pais = sql.listar_json("exec uspListarPais")
    return render(request, "pais/pais.html", {"listapais": lista_pais, "nombre": ""})


def recuperarpais(request):
    idpais = request.GET.get("idpais")
    sql = SQL()
    lista_pais = sql.listar_json("exec uspListarPais")
    objeto = sql.listar_json("exec uspRecuperarPais @idpais='{0}'".format(idpais))
    diccionario = objeto[0]
    nombre = diccionario["nombre"]
    return render(request,"pais/pais.html",{
        "listapais":lista_pais,
        "nombre":nombre,
        "idpais": idpais
    })


def eliminarpais(request):
    idpais = request.GET.get("idpais")
    sql = SQL()
    lista_pais = sql.listar_json("exec uspListarPais")
    registros = sql.enviarPost("exec uspEliminarPais @idpais='{0}'".format(idpais))
    if registros == 1:
        lista_pais = sql.listar_json("exec uspListarPais")
        return render(request,"pais/pais.html",{
            "listapais":lista_pais,
            "nombre":""
        })