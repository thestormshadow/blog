var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

// Initialize connection once

var dPort = 27017,
    dHost = "waffle.modulusmongo.net",
    dName = "r6asEmen";

//var dPort = 27017,
//    dHost = "localhost",
//    dName = "blogjvr94";

var BLOG = {};

BLOG.db = new Db(dName, new Server(dHost, dPort, {auto_reconnect: true},{}));
BLOG.db.open(function(e,d){
	if(e){        
		console.log(e)
	}else{
		console.log("Conectado a la base de datos: "+dName);
	}
});


BLOG.posts = BLOG.db.collection('posts');
BLOG.usuarios = BLOG.db.collection('usuarios');
BLOG.cuentas = BLOG.db.collection('cuentas');
BLOG.comentariosPost = BLOG.db.collection('comentariosPost');
BLOG.respuestasComentPost = BLOG.db.collection('respuestasComentPost');

module.exports = BLOG;