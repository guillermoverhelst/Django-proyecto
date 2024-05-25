window.onload=function(){
    pintar("/persona/listarpersona",undefined,undefined,true,true,"dni")
    navbaractivo("navpersona")
}

function buscarPersona(){
    var nombre = get("txtnombrepersona")
    pintar("/persona/buscarpersona/?nombrecompleto="+nombre,undefined,undefined,true,true,"dni")
}


function Editar(id){
    document.location.href="/persona/editarpersona/?dni="+id
}

function Eliminar(id){
    confirmacion(undefined,function(){

    })
}