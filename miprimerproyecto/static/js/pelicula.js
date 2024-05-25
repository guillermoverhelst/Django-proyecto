window.onload=function(){
    listar()
    $("#txtfechaestreno").datepicker({dateFormat:"dd/mm/yy",changeYear:true})
    fetchRecuperar("/pais/listarjson",function(data){
        llenarcombo(data,"idpais","nombre","cboPais")
    })
    fetchRecuperar("/pelicula/listargenerojson",function(data){
        llenarcombo(data,"idgenero","nombre","cboGenero")
    })
    fetchRecuperar("/pelicula/listartipocensurajson",function(data){
        llenarcombo(data,"idtipocensura","nombre","cboTipoCensura")
    })
    navbaractivo("navpelicula")
}


function listar(){
    pintar("/pelicula/listarPelicula/",undefined,undefined,true,true,"IDPELICULA",true)
}


function previewfoto(){
    var archivo = document.getElementById("fupfot").files[0]
    var file = new FileReader()
    file.onloadend=function(){
        document.getElementById("imgfoto").src= file.result
    }
    file.readAsDataURL(archivo)
}


function Editar(id){
    limpiarControles(".formpelicula .form-control")
    setI("diverrores","")
    if (id == 0) {
        setI("exampleModalLabel","Agregar pelicula")
    }else{
        setI("exampleModalLabel","Editar pelicula")
        fetchRecuperar("/pelicula/recuperarpelicula/?idpelicula="+id,function(data){
            var objeto = data[0]
            set("txtidpelicula",objeto.IDPELICULA)
            set("txttitulo",objeto.TITULO)
            set("cboGenero",objeto.IDGENERO)
            set("cboPais",objeto.IDPAIS)
            set("txtsipnopsis",objeto.SINOPSIS)
            set("txtduracion",objeto.DURACION)
            set("cboTipoCensura",objeto.IDTIPOCENSURA)
            setS("imgfoto",objeto.FOTO)
            set("txtfechaestreno",objeto.FECHAESTRENOCADENA)

        })
    }
}

function guardarDatos(){
    var objeto = {
            idpelicula:get("txtidpelicula"),
            titulo :get("txttitulo"),
            idgenero:get("cboGenero"),
            idpais: get("cboPais"),
            sinopsis:get("txtsipnopsis"),
            duracion:get("txtduracion"),
            idtipocensura:get("cboTipoCensura"),
            foto:getS("imgfoto"),
            fechaestreno:get("txtfechaestreno")
    }
    var obj = validarobligatorios(".formpelicula .form-control",["txtidpelicula","fupfot"])
    if(obj.exito==true){
        document.getElementById("diverrores").innerHTML=obj.contenido;
        return
    }
    confirmacion(undefined,function(){
        fetchPost("/pelicula/guardarpelicula/",objeto,function(){
        listar()
        limpiarControles(".formpelicula .form-control")
        document.getElementById("btncerrar").click();
        document.getElementById("diverrores").innerHTML="";
    })
    })

}

function Eliminar(id){
    confirmacion("Desea eliminar la pelicula?",function(){
        fetchDelete("/pelicula/eliminarpelicula/?idpelicula="+id,function(data){

                listar()

        })
    })
}