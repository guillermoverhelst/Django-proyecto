window.onload=function(){
    listar()
}

function listar(){
    pintar("/boton/listarasincrono",undefined,undefined,null,null,"IIDBOTON",false,["id boton","nombre","descripcion"],
    ["IIDBOTON","NOMBRE","DESCRIPCION"])
}