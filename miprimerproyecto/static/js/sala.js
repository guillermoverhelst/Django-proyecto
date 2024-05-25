window.onload=function(){
    listar()
    navbaractivo("navsala")
}

function listar(){
    pintar("/sala/listarsala/",undefined,undefined,true,true,"IDSALA",true,["SALA","CINE","NUM COLUMNA","NUM FILA"],["NOMBRESALA","NOMBRECINE","NUMEROCOLUMNAS","NUMEROFILAS"])
    fetchRecuperar("/cine/listarcine/",function(data){
        llenarcombo(data,"idcine","nombre","cbocinebuscar")
        llenarcombo(data,"idcine","nombre","cbocine")
    })
}


function Buscar(){
    var idcine = get("cbocinebuscar")
    pintar("/sala/filtrarsala/?idcine="+idcine,undefined,undefined,true,true,"IDSALA",true,["SALA","CINE","NUM COLUMNA","NUM FILA"],["NOMBRESALA","NOMBRECINE","NUMEROCOLUMNAS","NUMEROFILAS"])
}

function Editar(id){
    limpiarControles(".formsala .form-control")
    setI("diverrores","")
    if (id == 0) {
        setI("exampleModalLabel","Agregar Sala")
    }else{
        setI("exampleModalLabel","Editar Sala")
        fetchRecuperar("/sala/recuperarsala/?idsala="+id,function(data){
            var objeto = data[0]
            set("txtidsala",objeto.IDSALA)
            set("txtnombre",objeto.NOMBRE)
            set("cbocine",objeto.IDCINE)
            set("txtnumerocolumnas",objeto.NUMEROCOLUMNAS)
            set("txtnumerofilas",objeto.NUMEROFILAS)
        })
    }
}

function guardarDatos(){
    var obj = validarobligatorios(".formsala .form-control",["txtidsala"])
    if(obj.exito==true){
        document.getElementById("diverrores").innerHTML=obj.contenido;
        return
    }
    var objeto = {
            idsala:get("txtidsala"),
            nombre :get("txtnombre"),
            idcine:get("cbocine"),
            numerocolumnas: get("txtnumerocolumnas"),
            numerofilas:get("txtnumerofilas"),
    }

    confirmacion(undefined,function(){
        fetchPost("/sala/guardarsala/",objeto,function(){
        listar()
        limpiarControles(".formsala .form-control")
        document.getElementById("btncerrar").click();
        document.getElementById("diverrores").innerHTML="";
    })
    })

}


function Eliminar(id){
    confirmacion(undefined,function(){
        fetchDelete("/sala/eliminarsala/?idsala="+id,function(){
            listar()
        })
    })
}
