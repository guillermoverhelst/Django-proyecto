window.onload=function(){
    listar()
}

function listar(){
    pintar("/tipousuario/listarasincrono",undefined,undefined,true,true,"IIDTIPOUSUARIO",false)

}

function Editar(id){
    window.location.href="/tipousuario/editartipousuario/?idtipousuario="+id
}

function buscarPersona(){
    var nombre = get("txttipousuario")
    pintar("/tipousuario/filtrartipousuariopornombre/?nombretipousuario="+nombre,undefined,undefined,true,true,"IIDTIPOUSUARIO",false)

}

function Eliminar(id){
    confirmacion(undefined,function(){
        fetchDelete("/tipousuario/eliminartipousuario/?idtipousuario="+id,function(data){
            listar()
        })
    })
}