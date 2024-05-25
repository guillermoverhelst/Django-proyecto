from django.shortcuts import render
import json
from django.http import HttpResponse
from webconfig.query import SQL


def paginatipousuariohtml(request):
    return render(request,"paginatipousuario/paginatipousuario.html",None)

def listar(requets):
    sql=SQL()
    lista = sql.listar_json("exec uspListarPaginaTipoUsuario")
    return HttpResponse(json.dumps(lista))

def filtrar(request):
    sql = SQL()
    idtipousuario = request.GET.get("idtipousuario")
    lista = sql.listar_json("exec uspFiltrarPaginaTipoUsuario @idtipousuario='{0}'".format(idtipousuario))
    return HttpResponse(json.dumps(lista))

def editar(request):
    iidpaginatipousuario=request.GET.get("iidpaginatipousuario")
    return render(request,"paginatipousuario/editarpaginatipousuario.html", {
        "iidpaginatipousuario":iidpaginatipousuario
    })

def listarboton(request):
    sql =SQL()
    lista = sql.listar_json("exec uspListarBotones")
    return HttpResponse(json.dumps(lista))

def recuperarboton(request):
    sql = SQL()
    idpaginatipousuario= request.GET.get("iidpaginatipousuario")
    lista = sql.listar_json("exec uspRecuperarPaginasBotonTipoUsuario @idpaginatipousuario='{0}'".format(idpaginatipousuario))
    return HttpResponse(json.dumps(lista))

def guardar(request):
    sql =SQL()
    objeto = json.loads(request.body.decode("utf-8"))
    checks=objeto["checks"]
    idpaginatipousuario=objeto["idpaginatipousuario"]
    print(objeto)

    rpta = sql.enviarTransaccion("exec uspGuardarBotonesPaginaTipoUsuario @idpaginatipousuario='{0}', @opciones='{1}'".
                          format(idpaginatipousuario,checks))
    return HttpResponse(rpta)