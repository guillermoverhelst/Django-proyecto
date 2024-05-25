import json

from django.shortcuts import render

# Create your views here.
from webconfig.query import SQL
from django.http import HttpResponse

def listarPersona(request):
    return render(request,"persona/persona.html",None)


def listarPersonasincrona(request):
    sql = SQL()
    listado=sql.listar_json("exec uspListarPersona")
    return HttpResponse(json.dumps(listado))

def listarPersonaSinUsuario(request):
    sql = SQL()
    listado=sql.listar_json("exec uspListarPersonaSinUsuario")
    return HttpResponse(json.dumps(listado))

def buscarPersonasincrona(request):
    nombre = request.GET.get("nombrecompleto")
    sql = SQL()
    listado=sql.listar_json("exec uspFiltrarPersonaDjango @nombre='{0}'".format(nombre))
    return HttpResponse(json.dumps(listado))

def agregarpersona(request):
    sql = SQL()
    listasexo= sql.listar_json("exec uspListarSexo")
    return render(request,"persona/agregarpersona.html", {
      "listasexo":listasexo
    })


def guardarpersona(request):
    objeto_error={}
    existe_error = False
    idpersona= request.POST.get("idpersona")
    dni = request.POST.get("dni")
    if dni =="":
        objeto_error["dni"]="Debe ingresar su dni"
        existe_error = True
    nombre = request.POST.get("nombre")
    if nombre =="":
        objeto_error["nombre"]="Debe ingresar su nombre"
        existe_error = True
    apaterno = request.POST.get("apaterno")
    if apaterno =="":
        objeto_error["apaterno"]="Debe ingresar su apaterno"
        existe_error = True
    amaterno = request.POST.get("amaterno")
    if amaterno =="":
        objeto_error["amaterno"]="Debe ingresar su amaterno"
        existe_error = True
    fechanac = request.POST.get("fechanac")
    direccion = request.POST.get("direccion")
    telefonofijo = request.POST.get("telefonofijo")
    telefonocelular = request.POST.get("telefonocelular")
    idsexo = request.POST.get("idsexo")
    objetopersona={
        "dni" :dni,
        "nombre":nombre,
        "apaterno": apaterno,
        "amaterno": amaterno,
        "fechanac": fechanac,
        "direccion": direccion,
        "telefonofijo": telefonofijo,
        "telefonocelular": telefonocelular,
        "idsexo":idsexo
    }
    sql = SQL()
    if existe_error is False:
        nuevosregistros=sql.enviarPost("exec uspGuardarPersona @idpersona='{0}', @dni='{1}', @nombre='{2}',"
                                       " @appaterno='{3}', @apmaterno='{4}', @fechanac='{5}', @direccion='{6}', "
                                       "@telefonofijo='{7}', @telefonocelular='{8}', @idsexo='{9}'"
                                       .format(idpersona,dni,nombre,apaterno,amaterno,fechanac,direccion,telefonofijo,
                                               telefonocelular,idsexo))

        if nuevosregistros == 1 :
            return render(request,"persona/persona.html",None)
        else:
            listasexo = sql.listar_json("exec uspListarSexo")
            return render(request, "persona/agregarpersona.html", {
                "objetoError": objeto_error,
                "objetopersona":objetopersona,
                "listasexo": listasexo
            })
    else:
        listasexo = sql.listar_json("exec uspListarSexo")
        return render(request,"persona/agregarpersona.html",{
            "objetoError":objeto_error,
            "objetopersona": objetopersona,
            "listasexo": listasexo
        })


def editarpersona(request):
    sql = SQL()
    dni = request.GET.get("dni")
    listasexo = sql.listar_json("exec uspListarSexo")
    recuperardatos = sql.listar_json("exec uspRecuperarPersona @dni='{0}'".format(dni))
    idsexo= recuperardatos[0]["idsexo"]
    return render(request, "persona/editarpersona.html", {
        "listasexo": listasexo,
        "obj":recuperardatos[0],
        "idsexo":idsexo
    })

