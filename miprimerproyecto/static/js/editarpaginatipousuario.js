window.onload=function(){
    listar()
}

function listar(){
    pintar("/paginatipousuario/listarboton/",undefined,undefined,false,false,"IIDBOTON",false,undefined,undefined,
    false,undefined,true,true,function(){
        recuperarpaginas()
    })


}

function recuperarpaginas(){
    var iidpaginatipousuario= get("txtiidpaginatipousuario")
    fetchRecuperar("/paginatipousuario/recuperarboton/?iidpaginatipousuario="+iidpaginatipousuario,function(data){
        for(var i=0;i<data.length;i++){
            document.getElementById("chk"+data[i].IIDBOTON).checked = true
        }

    })
}

function guardarDatos(){
    var objeto={
        "idpaginatipousuario":get("txtiidpaginatipousuario"),
        "checks":obtenercheck()
    }
    confirmacion(undefined,function(){
        fetchPost("/paginatipousuario/guardar/",objeto,function(data){
            window.location.href="/paginatipousuario/paginatipousuariohtml/"
        })
    })
}