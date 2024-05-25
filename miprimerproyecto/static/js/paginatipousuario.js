window.onload=function(){
    listar()
}

function listar(){
    pintar("/paginatipousuario/listar/",undefined,undefined,true,true,"IIDPAGINATIPOUSUARIO",false)

}

function Editar(id){
    window.location.href="/paginatipousuario/editar/?iidpaginatipousuario="+id
}

function abrirModalBusqueda(){
    setI("exampleModalLabel","Seleccionar Tipo usuario")
    pintar("/tipousuario/listarasincrono/","divTablaSubpopup","tablapopup",false,false,"IIDTIPOUSUARIO",false
        ,undefined,undefined,true,"NOMBRE")
}

function limpiarTipoUsuario(){
    listar()
    set("txtnombre","")
    set("idtipousuario","")
}

function asignarValores(id,nombre){
    document.getElementById("btncerrar").click()
    set("txtnombre",nombre)
    set("idtipousuario",id)
    pintar("/paginatipousuario/filtrar/?idtipousuario="+id,undefined,undefined,true,false,"IIDPAGINATIPOUSUARIO",false)
}