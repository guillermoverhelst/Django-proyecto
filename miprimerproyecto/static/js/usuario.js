window.onload=function(){
    navbaractivo("navusuario")
    listar()
}

function listar(){
    pintar("/usuario/listarusuarioasincrono/",undefined,undefined,true,true,"IDUSUARIO",true)
}

function abrirModalSubpopup(){
    setI("ModalTitle","Seleccionar Tipo usuario")
    pintar("/usuario/listatipousuario/","divTablasubpopup","tablasubpopup",false,false,"iidtipousuario",false
    ,undefined,undefined,true,"nombre")
}

function asignarValores(id,nombre){
    document.getElementById("btncerrarsub").click()
    set("txtnombretiposuario",nombre)
    set("txtidtipousuario",id)
}

function guardarDatos(){
    var resultado= validarobligatorios(".formusuario .form-control",["txtidusuario"],true)
    if(resultado.exito == false){

        var objeto={
            "idusuario":get("txtidusuario"),
            "nombreusuario":get("txtnombre"),
            "idtipousuario":get("txtidtipousuario"),
            "contra":"",
            "idpersona":0

        }
        confirmacion(undefined,function(){
            fetchPost("/usuario/guardarusuario/",objeto,function(){
                document.getElementById("btncerrar").click()
                listar()
            })
        })
    }
}

function Editar(id){
    setI("exampleModalLabel","Editar usuario")
    fetchRecuperar("/usuario/recuperarusuario/?idusuario="+id,function(data){
        set("txtidusuario",id)
        set("txtnombre",data[0].NOMBREUSUARIO)
        set("txtnombretiposuario",data[0].TipoUsuario)
        set("txtidtipousuario",data[0].idtipousuario)
    })
}