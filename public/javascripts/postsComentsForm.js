function AgregaComentario(idpsot,idusuario){
    if(document.getElementById('comentario-message').value.length >= 3){
            $.ajax({
                url: "/posts/postcomentario",
                method: "POST",
                data: { idPost: idpsot, idUsuario: idusuario, Contenido: document.getElementById('comentario-message').value },
                dataType: "html"
            }).done(function(res) {
                alert("Comentario Agregado");
                location.reload();
            }).fail(function(e) {
                alert("Error: "+e);
            });
    }
    else{
        alert("No puede estar vacio el comentario");
    }
}

function ISession(){
            $.ajax({
                url: "/cuenta/login/checkloginajax",
                method: "POST",
                data: { isUsuario:escape(document.getElementById('isUsuario').value),isPassword:escape(document.getElementById('isPassword').value) },
                dataType: "html"
            }).done(function(res) {
                console.log(res);
                if(res!="false")
                    {
                        location.reload();
                    }
                else{
                    alert("Usuario o contraseña incorrecta");
                }
            }).fail(function(e) {
                alert("Error: "+e);
            });
}

function sendLikeComent(a,idComentario){
    $.ajax({
                url: "/posts/postcomentario/postcomentlikeajax",
                method: "POST",
                data: { idComent:idComentario },
                dataType: "html"
            }).done(function(res) {
                var value = a.innerHTML;
                a.innerHTML=parseInt(value)+1;
            }).fail(function(e) {
                alert("Error: "+e);
            });
}

function cleanComentario(){
    document.getElementById('comentario-message').value = "";
    document.getElementById('comentario-message').focus();
}