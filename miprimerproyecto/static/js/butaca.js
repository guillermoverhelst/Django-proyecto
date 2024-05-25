window.onload=function(){
    navbaractivo("navbutaca")
    listar()
}

function listar(){
    pintar("/funcion/listarfuncion/",undefined,undefined,true,false,"idfuncion",false)

}

function Editar(id){
    document.location.href="/butaca/verbutacas/?idfuncion="+id
}


function abrirModalBusqueda(){
    setI("exampleModalLabel","Seleccionar Cine")
    pintar("/cine/listarcine/","divTablaSubpopup","tablapopup",false,false,"idcine",false
        ,undefined,undefined,true,"nombre")
}

function asignarValores(id,nombre){
    document.getElementById("btncerrar").click()
    set("txtnombre",nombre)
    set("idcine",id)
    pintar("/cine/buscarfuncionporcine/?idcine="+id,undefined,undefined,true,false,"idfuncion",false)
}

function limpiarButaca(){
    listar()
    set("txtnombre","")
    set("idcine","")
}