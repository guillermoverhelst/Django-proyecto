import json

from django.shortcuts import render
from django.http import HttpResponse
from webconfig.query import SQL
def listarasincrono(request):
    sql = SQL()
    lista = sql.listar_json("exec uspListarTipoUsuarioDB")
    return HttpResponse(json.dumps(lista))


def listar(request):
    return render(request,"tipousuario/tipousuario.html",None)

def agregartipousuario(request):
    return render(request,"tipousuario/agregartipousuario.html",None)


def guardartipousuario(request):
    sql = SQL()
    objeto = json.loads(request.body.decode("utf-8"))
    idtipousuario = objeto["idtipousuario"]
    nombretipousuario = objeto["nombretipousuario"]
    descripciontipousuario=objeto["descripciontipousuario"]
    checks = objeto["checks"]
    rpta = sql.enviarTransaccion("exec uspGuardarTipoUsuario @idtipousuario ='{0}', @nombretipousuario='{1}', "
                                 "@descriociontipousuario='{2}', @opciones='{3}'".format(idtipousuario,nombretipousuario,descripciontipousuario,checks))
    return HttpResponse(rpta)


def editartipousuario(request):
    idtipousuario = request.GET.get("idtipousuario")
    return render(request,"tipousuario/editartipousuario.html", {
        "idtipousuario" : idtipousuario
    })

def recuperartipousuario(request):
    sql=SQL()
    idtipousuario = request.GET.get("idtipousuario")
    lista=sql.listar_json("exec uspRecuperarTipoUsuario @idtipousuario='{0}'".format(idtipousuario))
    return HttpResponse(json.dumps(lista))

def recuperardetalletipousuario(request):
    sql = SQL()
    idtipousuario = request.GET.get("idtipousuario")
    lista = sql.listar_json("exec uspRecuperarPaginasTipoUsuario @idtipousuario='{0}'".format(idtipousuario))
    return HttpResponse(json.dumps(lista))


def filtrartipousuariopornombre(request):
    sql = SQL()
    nombre = request.GET.get("nombretipousuario")
    lista = sql.listar_json("exec uspFiltrarTipoUsuarioPorNombre @nombre='{0}'".format(nombre))
    return HttpResponse(json.dumps(lista))

def eliminartipousuario(request):
    sql = SQL()
    idtipousuario = request.GET.get("idtipousuario")
    rpta = sql.enviarPost("exec uspEliminarTipoUsuario @idtipousuario='{0}'".format(idtipousuario))
    return HttpResponse(rpta)