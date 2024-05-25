from django.shortcuts import render
from webconfig.query import SQL
from django.http import HttpResponse
import json
import hashlib

def listar(request):
    return render(request,"usuario/usuario.html",None)



def agregarusuario(request):
    return render(request,"usuario/agregarusuario.html",None)


def listatipousuario(request):
    sql = SQL()
    lista= sql.listar_json("exec uspListarTipoUsuario")
    return HttpResponse(json.dumps(lista))


def guardarusuario(request):
    sql = SQL()
    objeto = json.loads(request.body.decode("utf-8"))
    idusuario= objeto["idusuario"]
    nombreusuario = objeto["nombreusuario"]
    contra = objeto["contra"]
    contra = hashlib.sha256(contra.encode()).hexdigest()
    idtipousuario=objeto["idtipousuario"]
    idpersona = objeto["idpersona"]
    registro= sql.enviarTransaccion("exec uspGuardarUsuario @idusuario='{0}', @nombreusuario='{1}', @contra='{2}', "
                          "@idtipousuario='{3}', @idpersona='{4}'".format(idusuario,nombreusuario,contra
                                                                          ,idtipousuario,idpersona))
    return HttpResponse(registro)


def listarusuarioasincrono(request):
    sql = SQL()
    lista = sql.listar_json("exec uspListarUsuario")
    return HttpResponse(json.dumps(lista))


def recuperarusuario(request):
    sql = SQL()
    idusuario = request.GET.get("idusuario")
    lista = sql.listar_json("exec uspRecuperaUsuario @idusuario='{0}'".format(idusuario))
    return HttpResponse(json.dumps(lista))

def login(request):
    sql = SQL()
    objeto = json.loads(request.body.decode("utf-8"))
    nombreusuario = objeto["nombreusuario"]
    contra = objeto["contra"]
    contra = hashlib.sha256(contra.encode()).hexdigest()
    rpta= sql.listar_json("exec upsLogin @nombreusuario='{0}', @contra='{1}'".format(nombreusuario,contra))
    data=rpta[0]
    cantidad= data["cantidad"]
    if cantidad ==1:
        listausuario = sql.listar_json("exec uspObtenerIdUsuario @nombreusuario='{0}', @contra='{1}'".format(nombreusuario,contra))
        dicusu= listausuario[0]
        idusuario = dicusu["IDUSUARIO"]
        request.session["idusuario"]=idusuario
        dictipo = listausuario[0]
        idtipousuario = dictipo["IDTIPOUSUARIO"]
        request.session["idtipousuario"]=idtipousuario
        return HttpResponse(idusuario)

    return HttpResponse(cantidad)