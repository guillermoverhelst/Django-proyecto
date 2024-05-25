window.onload=function(){
    listar()
    navbaractivo("navfuncion")
}

function listar(){
    pintar("/funcion/listarfuncion/",undefined,undefined,true,true,"idfuncion",true)
    fetchRecuperar("/pelicula/listarPelicula/",function(data){
        llenarcombo(data,"IDPELICULA","TITULO","cbopeliculabuscar")
        llenarcombo(data,"IDPELICULA","TITULO","cboidpeliculapoup")

    })

    fetchRecuperar("/cine/listarcine/",function(data){
        llenarcombo(data,"idcine","nombre","cboidcinepoup")
    })

}

function filtarporpelicula(){
    var idpelicula=get("cbopeliculabuscar")
    pintar("/funcion/filtrarfuncion/?idpelicula="+idpelicula,undefined,undefined,true,true,"idfuncion",true)

}

function Editar(id){
    limpiarControles(".formfuncion .form-control")
    obtenerSala()
    setI("diverrores","")
    if (id == 0) {
        setI("exampleModalLabel","Agregar Funcion")
        setD("divsalapop","block")
        setD("divcinepop","block")
    }else{
        setI("exampleModalLabel","Editar Funcion")
        setD("divsalapop","none")
        setD("divcinepop","none")
        fetchRecuperar("/funcion/recuperarfuncion/?idfuncion="+id,function(data){
        var objeto=data[0]
        set("txtidfuncion",objeto.idfuncion)
        set("txtfechachuncion",objeto.fechafuncion)
        set("cboidpeliculapoup",objeto.idpelicula)
    })
    }
}

function obtenerSala(){
    var idcine = get("cboidcinepoup")
    fetchRecuperar("/funcion/buscarsala/?idcine="+idcine,function(data){
        llenarcombo(data,"IDSALA","NOMBRE","cboidSalapoup")
    })
}

function guardarDatos(){
    if(get("txtidfuncion") == ""){
        var obj = validarobligatorios(".formfuncion .form-control",["txtidfuncion"])
        if(obj.exito==true){
            document.getElementById("diverrores").innerHTML=obj.contenido;
            return
        }
    }else{
        var obj = validarobligatorios(".formfuncion .form-control",["txtidfuncion","cboidcinepoup","cboidSalapoup"])
            if(obj.exito==true){
                document.getElementById("diverrores").innerHTML=obj.contenido;
                return
            }
    }
    var idfuncion = get("txtidfuncion")
    var fecha = get("txtfechachuncion")
    var fechamoment = moment(fecha)
    var fechaformateada= fechamoment.format("DD/MM/YYYY HH:mm")
    var idpelicula = get("cboidpeliculapoup")
    var idcine = get("cboidcinepoup")
    var idsala = get("cboidSalapoup")
    var objeto = {
        idfuncion,
        fechaformateada,
        idpelicula,
        idcine,
        idsala
    }
    fetchPost("/funcion/guardarfuncion/",objeto,function(){
        listar()
        limpiarControles(".formfuncion .form-control")
        document.getElementById("btncerrar").click();
        document.getElementById("diverrores").innerHTML="";
    })
}

function Eliminar(id){
    confirmacion(undefined,function(){
        fetchDelete("/funcion/eliminarfuncion/?idfuncion="+id,function(){
            listar()
        })
    })
}