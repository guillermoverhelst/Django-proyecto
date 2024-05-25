function guardarDatos(){
    var resultado= validarobligatorios(".formusuario .form-control",["txtidusuario"],true)
    if(resultado.exito == false){

        var objeto={
            "idusuario":get("txtidusuario"),
            "nombreusuario":get("txtnombreusuario"),
            "contra":get("txtcontusuario"),
            "idtipousuario":get("txtidtipousuario"),
            "idpersona":get("txtidpersona")
        }
        confirmacion(undefined,function(){
            fetchPost("/usuario/guardarusuario/",objeto,function(){
                window.location.href="/usuario/listar/"
            })
        })
    }
}

function abrirModal(nombre){
    if(nombre=="Tipousuario"){
        setI("exampleModalLabel","Seleccionar Tipo usuario")
        pintar("/usuario/listatipousuario/",undefined,undefined,false,false,"iidtipousuario",false
        ,undefined,undefined,true,"nombre")
    }else{
        setI("exampleModalLabel","Seleccionar Persona")
        pintar("/persona/listarpersonasinusuario/",undefined,undefined,false,false,"idpersona",false
        ,undefined,undefined,true,"NombreCompleto")

    }

}



function asignarValores(id,nombre){
    document.getElementById("btncerrar").click()
    var titulo = getI("exampleModalLabel")
    if(titulo=="Seleccionar Tipo usuario"){
        set("txtnombretiposuario",nombre)
        set("txtidtipousuario",id)
    }else{
        set("txtpersona",nombre)
        set("txtidpersona",id)
    }
}