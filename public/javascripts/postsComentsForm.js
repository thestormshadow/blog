function AgregaComentario(idpsot,idusuario){
    if(tinymce.get('comentario-message').getContent().length >= 3){
            $.ajax({
                url: "/posts/postcomentario",
                method: "POST",
                data: { idPost: idpsot, idUsuario: idusuario, Contenido: tinymce.get('comentario-message').getContent() },
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
    
function sendDisLikeComent(a,idComentario,idUsuario){
    $.ajax({
                url: "/posts/postcomentario/dislikecoment",
                method: "POST",
                data: { idComent:idComentario,idUsuario:idUsuario },
                dataType: "html"
            }).done(function(res) {
                var value = a.innerHTML;
                a.innerHTML=parseInt(value)-1;
                a.setAttribute('onclick','sendLikeComent(this,"'+idComentario+'","'+idUsuario+'")');
                a.setAttribute('style','');
            }).fail(function(e) {
                alert("Error: "+e);
            });
}

function sendLikeComent(a,idComentario,idUsuario){
    $.ajax({
                url: "/posts/postcomentario/likecoment",
                method: "POST",
                data: { idComent:idComentario,idUsuario:idUsuario },
                dataType: "html"
            }).done(function(res) {
                var value = a.innerHTML;
                a.innerHTML=parseInt(value)+1;
                a.setAttribute('onclick','sendDisLikeComent(this,"'+idComentario+'","'+idUsuario+'")');
                a.setAttribute('style','color: #2ebaae !important;');
            }).fail(function(e) {
                alert("Error: "+e);
            });
}

function showdiv(event)
{
	console.log("En proceso");
}

function cleanComentario(){
    document.getElementById('comentario-message').value = "";
    document.getElementById('comentario-message').focus();
}

function editarComentario(item){
    if(item.innerHTML == "Editar"){
    toastr.warning('Editando Comentario.');    
    var comp = $('#content'+item.getAttribute("sourcecom")).html();
    $('#content'+item.getAttribute("sourcecom")).html("<textarea id='edittemp"+item.getAttribute("sourcecom")+"'>"+comp+"</textarea>");
    item.innerHTML = "Guardar";
    
    
    
    tinymce.init({ 
	selector:'textarea',
    //menubar:false,
    //statusbar: false,
    language_url : 'javascripts/texteditor/langs/es_MX.js',  // site absolute URL
	theme: 'modern',
	plugins : ['contextmenu advlist autolink link image imagetools lists charmap print preview hr anchor pagebreak paste',
      		  'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
      		  'save table contextmenu directionality emoticons template paste textcolor codesample layer'],
	spellchecker_languages: 'English=en,Spanish=es',
	toolbar: 'insertfile undo redo | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify LetraMas LetraMenos | bullist numlist outdent indent | link image media codesample emoticons | searchreplace print preview  fullpage SavetoWord SavetoPDF',
	browser_spellcheck: true,
	insertdatetime_dateformat: "%Y-%m-%d",
	insertdatetime_element: true,
    theme_advanced_buttons3_add : "pastetext,pasteword,selectall",
	codesample_languages: [
        {text: 'HTML/XML', value: 'markup'},
        {text: 'JavaScript', value: 'javascript'},
        {text: 'CSS', value: 'css'},
        {text: 'PHP', value: 'php'},
        {text: 'Ruby', value: 'ruby'},
        {text: 'Python', value: 'python'},
        {text: 'Java', value: 'java'},
        {text: 'C', value: 'c'},
        {text: 'C#', value: 'csharp'},
        {text: 'C++', value: 'cpp'}
    	],
    setup: function (editor) {
        editor.addButton('LetraMas', {
            text: 'Size +',
            icon: false,
            onclick: function () {
                    var text = editor.selection.getContent({ 'format' : 'text' });
                    if(text != ""){
                        var content = editor.selection.getContent();
                        var node = editor.selection.getNode();
                        var fontsize = editor.dom.getStyle(node, 'font-size', true);
                        fontsize = fontsize.split("px", 1);
                        fontsize = parseInt(fontsize) + 5;
                        //var tam = editor.selection.Styles.getStyle( 'font-size' );
                        if (text && text.length > 0) {
                            editor.execCommand('mceInsertContent', false, '<span id="this" style="font-size:'+fontsize+'px;">' + text + '</span>');
                        }
                    }else{
                        notifyTimeout('warning',1500,"Selecciona un blocke de texto");
                    }
                    
            }
        });
        editor.addButton('LetraMenos', {
            text: 'Size -',
            icon: false,
            onclick: function () {
                  var text = editor.selection.getContent({ 'format' : 'text' });
                    if(text != ""){
                        var content = editor.selection.getContent();
                        var node = editor.selection.getNode();
                        var fontsize = editor.dom.getStyle(node, 'font-size', true);
                        fontsize = fontsize.split("px", 1);
                        fontsize = parseInt(fontsize) - 5;
                        //var tam = editor.selection.Styles.getStyle( 'font-size' );
                        if (text && text.length > 0) {
                            editor.execCommand('mceInsertContent', false, '<span style="font-size:'+fontsize+'px;">' + text + '</span>');
                        } 
                    }else{
                        notifyTimeout('warning',1500,"Selecciona un blocke de texto");
                    }
            }
        });
        editor.addButton('SavetoWord', {
            title: 'Guardar en word',
            image: 'javascripts/texteditor/newico/wordico.png',
            onclick: function () {
                  var contentDocument = tinymce.get('mce_0').getDoc();
                  var content = '<!DOCTYPE html>' + contentDocument.documentElement.outerHTML;
                  var converted = htmlDocx.asBlob(content);
                  saveAs(converted, 'test.docx');      
            }
        });
        editor.addButton('SavetoPDF', {
            title: 'Guardar en PDF',
            image: 'javascripts/texteditor/newico/pdfico.png',
            onclick: function () {
                doc.fromHTML(tinymce.get('mce_0').getBody(), 15, 15, {
                    'width': 170
                });
                doc.save('sample-file.pdf');   
            }
        });
    },
	contextmenu: "link image inserttable | cell row column deletetable"
    });
    }else{
        //actualiza contenido
        var r = confirm("Estas seguro de editar este comentario?");
            if (r == true) {
                $.ajax({
                    url: "/posts/postcomentario/editcoment",
                    method: "POST",
                    data: { idComent:item.getAttribute("sourcecom"),contenido:tinymce.get("edittemp"+item.getAttribute("sourcecom")).getContent() },
                    dataType: "html"
                }).done(function(res) {          $('#content'+item.getAttribute("sourcecom")).html(tinymce.get("edittemp"+item.getAttribute("sourcecom")).getContent());
                    toastr.success('Comentario editado correctamente!');
                    item.innerHTML = "Editar";
                }).fail(function(e) {
                    alert("Error: "+e);
                });
            }
        
    }
    
}

function eliminaComentario(item){
            var r = confirm("Estas seguro de eliminar este comentario?");
            if (r == true) {
                $.ajax({
                    url: "/posts/postcomentario/delComent",
                    method: "POST",
                    data: { idComent:item.getAttribute("sourcecom") },
                    dataType: "html"
                }).done(function(res) {
                    $("#com"+item.getAttribute("sourcecom")).fadeOut();
                    toastr.success('Comentario eliminado correctamente!');
                }).fail(function(e) {
                    alert("Error: "+e);
                });
            }
    
}


    var doc = new jsPDF();
    $("#mce_0_ifr").ready(function(){
        //$("div.mce-toolbar").hide();
        //$("div.mce-toolbar-grp").css("padding","0px"); 
    });
	tinymce.init({ 
	selector:'textarea',
    //menubar:false,
    //statusbar: false,
    language_url : 'javascripts/texteditor/langs/es_MX.js',  // site absolute URL
	theme: 'modern',
	plugins : ['contextmenu advlist autolink link image imagetools lists charmap print preview hr anchor pagebreak paste',
      		  'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
      		  'save table contextmenu directionality emoticons template paste textcolor codesample layer'],
	spellchecker_languages: 'English=en,Spanish=es',
	toolbar: 'insertfile undo redo | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify LetraMas LetraMenos | bullist numlist outdent indent | link image media codesample emoticons | searchreplace print preview  fullpage SavetoWord SavetoPDF',
	browser_spellcheck: true,
	insertdatetime_dateformat: "%Y-%m-%d",
	insertdatetime_element: true,
    theme_advanced_buttons3_add : "pastetext,pasteword,selectall",
	codesample_languages: [
        {text: 'HTML/XML', value: 'markup'},
        {text: 'JavaScript', value: 'javascript'},
        {text: 'CSS', value: 'css'},
        {text: 'PHP', value: 'php'},
        {text: 'Ruby', value: 'ruby'},
        {text: 'Python', value: 'python'},
        {text: 'Java', value: 'java'},
        {text: 'C', value: 'c'},
        {text: 'C#', value: 'csharp'},
        {text: 'C++', value: 'cpp'}
    	],
    setup: function (editor) {
        editor.addButton('LetraMas', {
            text: 'Size +',
            icon: false,
            onclick: function () {
                    var text = editor.selection.getContent({ 'format' : 'text' });
                    if(text != ""){
                        var content = editor.selection.getContent();
                        var node = editor.selection.getNode();
                        var fontsize = editor.dom.getStyle(node, 'font-size', true);
                        fontsize = fontsize.split("px", 1);
                        fontsize = parseInt(fontsize) + 5;
                        //var tam = editor.selection.Styles.getStyle( 'font-size' );
                        if (text && text.length > 0) {
                            editor.execCommand('mceInsertContent', false, '<span id="this" style="font-size:'+fontsize+'px;">' + text + '</span>');
                        }
                    }else{
                        notifyTimeout('warning',1500,"Selecciona un blocke de texto");
                    }
                    
            }
        });
        editor.addButton('LetraMenos', {
            text: 'Size -',
            icon: false,
            onclick: function () {
                  var text = editor.selection.getContent({ 'format' : 'text' });
                    if(text != ""){
                        var content = editor.selection.getContent();
                        var node = editor.selection.getNode();
                        var fontsize = editor.dom.getStyle(node, 'font-size', true);
                        fontsize = fontsize.split("px", 1);
                        fontsize = parseInt(fontsize) - 5;
                        //var tam = editor.selection.Styles.getStyle( 'font-size' );
                        if (text && text.length > 0) {
                            editor.execCommand('mceInsertContent', false, '<span style="font-size:'+fontsize+'px;">' + text + '</span>');
                        } 
                    }else{
                        notifyTimeout('warning',1500,"Selecciona un blocke de texto");
                    }
            }
        });
        editor.addButton('SavetoWord', {
            title: 'Guardar en word',
            image: 'javascripts/texteditor/newico/wordico.png',
            onclick: function () {
                  var contentDocument = tinymce.get('mce_0').getDoc();
                  var content = '<!DOCTYPE html>' + contentDocument.documentElement.outerHTML;
                  var converted = htmlDocx.asBlob(content);
                  saveAs(converted, 'test.docx');      
            }
        });
        editor.addButton('SavetoPDF', {
            title: 'Guardar en PDF',
            image: 'javascripts/texteditor/newico/pdfico.png',
            onclick: function () {
                doc.fromHTML(tinymce.get('mce_0').getBody(), 15, 15, {
                    'width': 170
                });
                doc.save('sample-file.pdf');   
            }
        });
    },
	contextmenu: "link image inserttable | cell row column deletetable"
	});
    function notifyTimeout(type,time,texto) {
		var notification = tinymce.activeEditor.notificationManager.open({
			text: texto,
            type: type,
			timeout: time
		});
	}

$('document').ready(function(){
        $('.enginediv').each(function(index,item){
            item.innerHTML = item.getAttribute('sourcehtm');
        }) 
        });