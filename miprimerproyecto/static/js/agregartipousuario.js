window.onload=function(){
    listar()
}

function listar(){
    pintar("/pagina/listarasincrono/",undefined,undefined,false,false,"iidpagina",false,undefined,undefined,
    false,undefined,true)

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