String.prototype.isEmail = function() {
    return (this.valueOf().search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1);
}

var EnviarLogin = function()
{
    document.getElementById("errusuario").style.display = "none";
    document.getElementById("errpassw").style.display = "none";
    if ($('input#isUsuario').val().length == 0 || $('input#isUsuario').val()[0] == " " || $('input#isUsuario').val().length <= 2){
        document.getElementById("errusuario").style.display = "block";
        $('input#isUsuario').focus();
    } else if ($('input#isPassword').val().length == 0 || $('input#isPassword').val()[0] == " " || $('input#isPassword').val().length <= 2){
        document.getElementById("errpassw").style.display = "block";
        $('input#isPassword').focus();
    }else{
        return true;
    }
    return false;
}

var EnviarRegistro = function()
{
    //document.getElementById("errusuario").style.display = "none";
    //document.getElementById("errpassw").style.display = "none";
    if ($('input#RegNombre').val().length == 0 || $('input#RegNombre').val()[0] == " " || $('input#RegNombre').val().length <= 2){
        //document.getElementById("errusuario").style.display = "block";
        $('input#RegNombre').focus();
    } else if ($('input#RegApellidos').val().length == 0 || $('input#RegApellidos').val()[0] == " " || $('input#RegApellidos').val().length <= 2){
        //document.getElementById("errpassw").style.display = "block";
        $('input#RegApellidos').focus();
    } else if ($('input#RegCorreo').val().length == 0 || $('input#RegCorreo').val()[0] == " " || $('input#RegCorreo').val().length <= 2){
        //document.getElementById("errpassw").style.display = "block";
        $('input#RegCorreo').focus();
    } else if ($('input#RegUsuario').val().length == 0 || $('input#RegUsuario').val()[0] == " " || $('input#RegUsuario').val().length <= 2){
        //document.getElementById("errpassw").style.display = "block";
        $('input#RegUsuario').focus();
    } else if ($('input#RegPassword').val().length == 0 || $('input#RegPassword').val()[0] == " " || $('input#RegPassword').val().length <= 2){
        //document.getElementById("errpassw").style.display = "block";
        $('input#RegPassword').focus();
    } else if ($('input#RegRPassword').val().length == 0 || $('input#RegRPassword').val()[0] == " " || $('input#RegRPassword').val().length <= 2){
        //document.getElementById("errpassw").style.display = "block";
        $('input#RegRPassword').focus();
    } else if ($('#Paises').val() == ''){
        $('#Paises').focus();
    } else {
        return true;
    }
    alert("Llene todos los campos");
    return false;
}