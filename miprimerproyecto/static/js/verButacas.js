window.onload=function(){
    listar()
}

function listar(){
    var idfuncion = get("txtidfuncion")
    fetchRecuperar("/butaca/buscarbutacas/?idfuncion="+idfuncion,function(data){
        var objeto = data[data.length - 1]
        var indicefila = objeto.INDICEFILA
        var indicecolumna = objeto.INDICECOLUMNA
        var contador = 0
        var contenido ="<div>"
        contenido += "</div>"
        for(var i = 0;i< indicefila;i++){
            contenido+="<div style = 'display:flex'>"
            for(var j=0;j<indicecolumna;j++){
                objeto= data[contador]
                contenido+=`
                            <div
                            ondblclick="mostarmensaje(${objeto.BLIBRE},${contador+1})"
                            style="width:60px;height:60px;margin:16px;
                            color:white;display:flex;justify-content:center;
                            align-items:center;font-weight:bold;
                            background-color:${objeto.BLIBRE==true?"blue":"red"}"
                            >${contador+1}


                            </div>
                `
                contador++
            }
            contenido+="</div>"
        }
        setI("divTabla",contenido)
    })
}


function mostarmensaje(libre,numerobutaca){
    var idfuncion = get("txtidfuncion")
    if(libre == true){
        confirmacion("Desea ocupar la butaca numero "+numerobutaca,function(data){
            fetchDelete("/butaca/ocuparbutaca/?idfuncion="+idfuncion+"&idbutaca="+numerobutaca,function(){
                listar()
            })
        })
    }
}