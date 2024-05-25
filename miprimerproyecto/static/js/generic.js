window.onload = function(){
$(".dataframe").DataTable()
$("#table").DataTable()
var elemento = document.querySelectorAll(".dataframe")
        for(var i=0;i<elemento.length;i++){
            elemento[i].classList.add("table")
        }

}

function obtenercheck(){
    var checkboxs = document.getElementsByClassName("checkbox")
    var contenido =""
    for(var i = 0;i< checkboxs.length;i++){
        if(checkboxs[i].checked == true){
            contenido+=checkboxs[i].id.replace("chk","")
            contenido+="*"
        }
    }
    if(contenido.length>0) contenido=contenido.substring(0,contenido.length-1)
    return contenido
}

function clickcelda(td){
    var valor = td.getAttribute("data-valor")
    td.innerHTML =""
    td.insertAdjacentHTML("beforeEnd",`
    <input class='form form-control' type='text' value='${valor}'/>
    `)
    var trfila=td.parentNode
    var ultimotd=trfila.lastChild
    if(ultimotd.childNodes.length==0){
    ultimotd.insertAdjacentHTML("beforeEnd",`
    <button class='btn btn-success' onclick='Cargar(guardarElementos(this))'>Guardar</button> <button onclick='cancelar(this)' class='btn btn-danger'>Cancelar</button>
    `)
    }
}

function agregarFila(id){
    var tabla = document.getElementById(id)
    var propiedadId = tabla.getAttribute("data-propiedadId")
    var objthead = tabla.children[1]
    var objtr = objthead.children[0]
    var nrnodos = objtr.children.length
    var objtbody = tabla.children[2]
    var nfilas = objtbody.children.length
    var trultimo = objtbody.children[nfilas-1]
    if(trultimo.children[0].getAttribute("data-valor")!=""){
        var contenido ="<tr>"
        var propiedadnombre
        for(var i =0;i<nrnodos-1;i++){
            propiedadnombre=objthead.children[0].children[i].getAttribute("data-cabecera")
            contenido+=`<td data-valor=''> <input ${propiedadnombre==propiedadId?`readonly`:``} type='text' class='form form-control'/> </td>`
        }
        contenido+=`
         <td>
         <button class='btn btn-danger' onclick='cancelarfila(this)'>Cancelar</button>
         <button class='btn btn-primary' onclick='Cargar(guardarElementos(this))'>Guardar</button>
         </td>
        `

        contenido+="</tr>"
        objtbody.insertAdjacentHTML("beforeEnd",contenido)
    }
}
function cancelarfila(btn){
    var tdactual = btn.parentNode
    var tractual = tdactual.parentNode
    var padretr = tractual.parentNode
    padretr.removeChild(tractual)
}

function cancelar(btn){
    tdactual=btn.parentNode
    tractual = tdactual.parentNode
    for(var i=0;i<tractual.children.length-1;i++){
        tdObjeto=tractual.children[i]
        tdObjeto.innerHTML=tdObjeto.getAttribute("data-valor")
    }
    tractual.children[tractual.children.length-1].innerHTML=""
}



function guardarElementos(btn){
    var trFila = btn.parentNode.parentNode
    var valores= []
    var elementoactual
    for(var i =0;i<trFila.children.length-1;i++){
        elementoactual=trFila.children[i]
        if(elementoactual.children.length > 0 && elementoactual.children[0].nodeName=="INPUT"){
            valores.push(elementoactual.children[0].value)
        }else{
            valores.push(elementoactual.getAttribute("data-valor"))
        }
    }
    return valores
}


var cabecerasJSON;
function pintar(url,idDiv="divTabla",idTabla="tabla",opcionEditar = false,opcionEliminar=false,propiedadId ="Id",
isPopup=false,titulos,propiedades,subpopup=false,propiedadDisplay,ischecked=false,isCallback=false,callback){
 fetch(url).then(res=>res.json())
    .then(res=>{
       var contenido="<table data-propiedadId='"+propiedadId+"' id ="+idTabla+" class='table'>";
        //alert(JSON.stringify(res));
        //alert(Object.keys(res[0])) ->array
        if(res.length>0  || cabecerasJSON != null || titulos != null){
            var keys;
            if(res.length > 0){
                if(propiedades == undefined)
                keys = Object.keys(res[0]);
                else
                keys = propiedades
            }else{
                if(propiedades == undefined)
                keys = cabecerasJSON;
                else
                keys = propiedades
            }
            if(res.length>0){
            if(propiedades == undefined)
            cabecerasJSON = keys
            else
            keys =propiedades
            }
            contenido+="<thead><tr>";
            if(titulos == undefined){
                if(ischecked) contenido+="<td></td>"
                for(var i=0;i<keys.length;i++){
                contenido+="<td data-cabecera='"+keys[i]+"'>";
                contenido+=keys[i].toUpperCase()
                 contenido+="</td>";
                }
            }else{
                if(ischecked) contenido+="<td></td>"
                for(var i=0;i<titulos.length;i++){
                contenido+="<td data-cabecera='"+keys[i]+"'>";
                contenido+=titulos[i].toUpperCase()
                 contenido+="</td>";
                }
            }
            if(opcionEditar == true || opcionEliminar == true || subpopup == true ||
            (opcionEliminar==null && opcionEditar == null)){
                contenido += "<td>Operaciones</td>"
            }
            contenido+="</tr></thead>";
            contenido+="<tbody>"
            var objeto
            var keyactual
            for(var i=0;i<res.length;i++){
                objeto=res[i]
                contenido+="<tr>";
                if(ischecked)
                contenido+=`<td> <input type='checkbox' class='checkbox' id='chk${objeto[propiedadId]}' /> </td>`
                 for(var j=0;j<keys.length;j++){
                    keyactual=keys[j]
                    contenido+=`<td ${(opcionEditar==null && opcionEliminar==null && keyactual != propiedadId)  ? `ondblclick='clickcelda(this)'
                    `:``}

                    ${(opcionEditar==null && opcionEliminar==null) ? `data-valor='${objeto[keyactual]}'`:``}

                    >`
                    contenido+=objeto[keyactual]
                    contenido+="</td>"

                 }
                 if(opcionEditar == true || opcionEliminar == true || subpopup == true ||
                 (opcionEliminar==null && opcionEditar == null)){
                    contenido += "<td>"
                    if(opcionEditar == true){
                        contenido += `<i class = 'btn btn-primary' ${isPopup ? `data-bs-toggle="modal" data-bs-target="#exampleModal"`:``}
                        onclick = 'Editar(${objeto[propiedadId]})'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                        </i> `

                    }
                    if(opcionEliminar == true){
                        contenido+= ` <i class= 'btn btn-danger' onclick = 'Eliminar(${objeto[propiedadId]})')>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16"
                        height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                        </svg>
                        </i>`
                    }
                    if(subpopup == true){

                        contenido+=`<i class="btn btn-success" onclick="asignarValores(${objeto[propiedadId]},'${objeto[propiedadDisplay]}')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                    </i>`


                    }

                        contenido += "</td>"

                 }
            }
                contenido+="</tr>";

            contenido+="</tbody>"
        }
        contenido+="</table>"
        document.getElementById(idDiv).innerHTML=contenido
        $("#"+idTabla).DataTable()
        if(isCallback == true){
        callback()
        }
    })

}

function get(id){
    return document.getElementById(id).value;
}

function set(id,valor){
     document.getElementById(id).value = valor;
}

function setI(id,valor){
     document.getElementById(id).innerHTML = valor;
}

function getI(id){
    return document.getElementById(id).innerHTML
}

function setS(id,valor){
     document.getElementById(id).src = valor;
}

function setD(id,valor){
     document.getElementById(id).style.display = valor;
}

function getS(id){
     return document.getElementById(id).src
}

function fetchRecuperar(url,callback){
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
        callback(res)
    })

}

function fetchDelete(url,callback){
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
        if(res == 1){
            callback()
        }else{
            error()
        }

    })

}

function fetchPost(url,objeto,callback){
    var token = document.getElementsByName("csrfmiddlewaretoken")[0].value
    fetch(url,{
            headers:{
                "Content-type":"application/json",
                "X-CSRFToken":token
            },
            method:"POST",
            body:JSON.stringify(objeto)
        }).then(res=>res.text()).then(res=>{
        if (res ==1){
            correcto()
            callback()
        }else{
            error()
        }

    })
}

function fetchLogin(url,objeto,callback){
    var token = document.getElementsByName("csrfmiddlewaretoken")[0].value
    fetch(url,{
            headers:{
                "Content-type":"application/json",
                "X-CSRFToken":token
            },
            method:"POST",
            body:JSON.stringify(objeto)
        }).then(res=>res.text()).then(res=>{
        if (res >0){
            //correcto()
            callback()
        }else{
            error()
        }

    })
}

function limpiarControles(selector){
    var controles = document.querySelectorAll(selector)
    var ncontroles = controles.length
    for (var i =0;i<controles.length;i++){
        if(controles[i].nodeName =="INPUT"){
            controles[i].value =""
        }else if(controles[i].nodeName =="SELECT"){
            controles[i].value = "0"

        }else if(controles[i].nodeName =="TEXTAREA"){
            controles[i].value =""

        }else if(controles[i].nodeName =="IMG"){
            controles[i].src =""

        }
    }
}


function llenarcombo(data,propiedadId,propiedadMostrar,idCombo){
    var contenido=""
    contenido+="<option value='0'> --Seleccione-- </option>"
    var elementoactual
    for(var i=0;i<data.length;i++){
        elementoactual=data[i]
        contenido+="<option value='"+elementoactual[propiedadId]+"'> "+elementoactual[propiedadMostrar]+" </option>"

    }
    document.getElementById(idCombo).innerHTML=contenido
}

function validarobligatorios(selector,camposobviar=[],campoAcampo=false){

    var control
    var controles = document.querySelectorAll(selector)
    var ncontroles = controles.length
    var errores = "<ol class='alert alert-danger'>"
    var hayerrores=false
    for (var i =0;i<ncontroles;i++){
        control = controles[i]
        if(control.tagName == "SELECT"){
            if(campoAcampo == false){
                if(control.value == "0" && camposobviar.indexOf(control.id)==-1){
                    hayerrores=true
                    errores+="<li>Debe ingresar "
                    if(control.getAttribute("data-campo")==null)
                    errores+=control.id.replace("cbo","")
                    else
                    errores+=control.getAttribute("data-campo")
                    errores+="</li>"
                }
            }else{
                 if(control.value == "0" && camposobviar.indexOf(control.id)==-1){
                    hayerrores=true
                    if(document.getElementById("div"+control.id)){
                        if(control.getAttribute("data-campo")==null){
                            document.getElementById("div"+control.id).innerHTML="<span style='color:red'> Debe ingresar "
                            +control.id.replace("cbo","")+"</span>"
                        }else{
                            document.getElementById("div"+control.id).innerHTML="<span style='color:red'> Debe ingresar "
                            +control.getAttribute("data-campo")+"</span>"
                        }
                    }
                 }else{
                    if(document.getElementById("div"+control.id)){
                        document.getElementById("div"+control.id).innerHTML=""
                    }
                 }
            }
        }else{
            if(campoAcampo == false){
                if(control.value == "" && camposobviar.indexOf(control.id)==-1){
                    hayerrores=true
                    errores+="<li>Debe ingresar "
                    if(control.getAttribute("data-campo")==null)
                    errores+=control.id.replace("txt","")
                    else
                    errores+=control.getAttribute("data-campo")
                    errores+="</li>"
                }
            }else{
                if(control.value == "" && camposobviar.indexOf(control.id)==-1){
                    hayerrores=true
                     if(document.getElementById("div"+control.id)){
                         if(control.getAttribute("data-campo")==null){
                            document.getElementById("div"+control.id).innerHTML="<span style='color:red'> Debe ingresar "
                            +control.id.replace("txt","")+"</span>"
                         }else{
                            document.getElementById("div"+control.id).innerHTML="<span style='color:red'> Debe ingresar "
                            +control.getAttribute("data-campo")+"</span>"
                         }
                     }
                }else{
                    if(document.getElementById("div"+control.id)){
                        document.getElementById("div"+control.id).innerHTML=""
                    }
                }
            }
        }
    }
    errores+="</ol>"
    return{
        exito:hayerrores,
        contenido:errores
    }
}

function error(texto ="Ocurrio un error"){
    Swal.fire({
      icon: "error",
      title: "Error",
      text: texto,
      footer: '<a href="#">Why do I have this issue?</a>'
    });

}

function correcto(texto = "Se guardo correctamente"){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: texto,
      showConfirmButton: false,
      timer: 1500
    });
}

function confirmacion(texto ="Desea guardar los cambios?", callback){
    return Swal.fire({
      title: "Confirmacion",
      text: texto,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        callback()
      }
    });
}


function navbaractivo(id){
    var item = document.getElementById(id)
    var url = location.href
    if(item.href == url){
        item.className = "nav-link active"
    }

}