window.onload=function(){
    listar()
    navbaractivo("navcine")
}


function listar(){
    pintar("/cine/listarcine",undefined,undefined,true,true,"idcine")
    fetchRecuperar("/cine/listartipocine",function(data){
        llenarcombo(data,"IDTIPOCINE","NOMBRE","tipocine")
    })
    $("#fechaapertura").datepicker({dateFormat:"dd/mm/yy",changeYear:true})
}

function buscarCine(){
    var nombre = get("txtnombre")
    if (nombre == ""){
        pintar("/cine/listarcine")
    }else{
        pintar("/cine/buscarcinepornombre/?nombre="+nombre,undefined,undefined,true,true,"idcine")
    }
}

function Editar(id){
    fetchRecuperar("/cine/recuperarcine/?idcine="+id,function(data){
        var objeto = data[0]
        set("txtidcine",objeto.idcine)
        set("txtnombrecine",objeto.nombre)
        set("txtdireccion",objeto.direccion)
        set("tipocine",objeto.idtipocine)
        set("fechaapertura",objeto.fechaapertura)
    })
}

function guardarCine(){
    var resultado= validarobligatorios(".formulariocine .form-control",["txtidcine"])
    if(resultado.exito == true){
        document.getElementById("diverrores").innerHTML=resultado.contenido
        return
    }else{
        document.getElementById("diverrores").innerHTML=""
    }
    var idcine =get("txtidcine")
    var nombre =get("txtnombrecine")
    var direccion =get("txtdireccion")
    var idtipocine =get("tipocine")
    var fechaapertura = get("fechaapertura")
    var token = document.getElementsByName("csrfmiddlewaretoken")[0].value
    var objeto = {
        "idcine":idcine,
        "nombre":nombre,
        "direccion":direccion,
        "tipocine":idtipocine,
        "fechaapertura":fechaapertura
    }
    confirmacion(undefined,function(){
        fetchPost("/cine/guardarcine/",objeto,function(){
        listar()
        limpiarControles(".formcine .form-control")
        document.getElementById("diverrores").innerHTML="";
    })
    })

}


function nuevoCine(){
    limpiarControles(".formcine .form-control")
}

function Eliminar(id){
    confirmacion("Desea eliminar el cine?",function(){
        fetchDelete("/cine/eliminarcine/?idcine="+id,function(data){
            listar()
            limpiarControles(".formcine .form-control")
        })
    })
}