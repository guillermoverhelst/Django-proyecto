function Ingresar(){
    var objeto={
            "nombreusuario":get("txtusuario"),
            "contra":get("txtcontra")
        }
        confirmacion(undefined,function(){
            fetchLogin("/usuario/login/",objeto,function(){
                document.location.href="/paginaprincipal/paginaprincipal/"
            })
        })
}