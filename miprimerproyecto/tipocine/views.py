from django.shortcuts import render
from webconfig.query import SQL
# Create your views here.

def listarTipoCine(request):
    odasql = SQL()
    listacine=odasql.listar_html("uspListarTipoCine")
    return render(request, "tipocine/tipocine.html",{
        "lista": listacine,
    })

def buscarTipoCine(request):
    nombre = request.POST.get("nombre")
    odasql = SQL()
    listacine = odasql.listar_html("uspFiltrarTipoCineDjango @nombre='{0}'".format(nombre))
    return render(request,"tipocine/tipocine.html",
                  {"lista":listacine,
                   "nombre":nombre
    })