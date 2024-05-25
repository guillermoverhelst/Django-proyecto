window.onload=function(){
    listar()
}

function listar(){
    pintar("/pagina/listarasincrono/",undefined,undefined,false,false,"iidpagina",false,undefined,undefined,
    false,undefined,true,true,function(){
        recuperarpaginas()
    })
    recuperarTipoUsuario()

}

function recuperarTipoUsuario(){
    var idtipousuariovalor= get("idtipousuario")
    fetchRecuperar("/tipousuario/recuperartipousuario/?idtipousuario="+idtipousuariovalor,function(data){
        set("txtidtipousuario",idtipousuariovalor)
        set("txtnombretipousuario",data[0].NOMBRE)
        set("txtdescripcion",data[0].DESCRIPCION)

    })
}

function recuperarpaginas(){
    var idtipousuariovalor= get("idtipousuario")
    fetchRecuperar("/tipousuario/recuperardetalletipousuario/?idtipousuario="+idtipousuariovalor,function(data){
        for(var i=0;i<data.length;i++){
            document.getElementById("chk"+data[i].IIDPAGINA).checked = true
        }

    })
}

function guardarDatos(){
    var resultado= validarobligatorios(".formtipousuario .form-control",["txtidtipousuario"],true)
    if(resultado.exito == false){

        var objeto={
            "idtipousuario":get("txtidtipousuario"),
            "nombretipousuario":get("txtnombretipousuario"),
            "descripciontipousuario":get("txtdescripcion"),
            "checks":obtenercheck()

        }
        confirmacion(undefined,function(){
            fetchPost("/tipousuario/guardartipousuario/",objeto,function(){
                window.location.href="/tipousuario/listar/"
            })
        })
    }
}