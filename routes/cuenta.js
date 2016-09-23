var modelcuenta = require('../models/cuenta') 

var cuentaroute = function(app){
    
    app.get('/cuenta/login', function(req, res){
		res.render('cuenta', { type:'login'});
	})
    app.get('/cuenta/registro', function(req, res){
		res.render('cuenta', { type:'registro'});
	})
    
}

module.exports = cuentaroute;
    /*
    app.get('/post', function(req, res){
		posts.list(function(e, resp){
			res.render('post', { vars: resp.Tags,error:'', blogs: resp });
		})
		
	})
	
	app.post('/create', function(req, res){
		posts.new({Postdir: req.param('Postdir'), Titulo: req.param('Titulo'), SubTitulo: req.param('SubTitulo'), Autor: req.param('Autor'), Like: req.param('Like'), Contenido: req.param('Contenido'), Fecha: req.param('Fecha'), UrlPortada: req.param('UrlPortada'), Tags: req.param('Tags'), Estatus: req.param('Estatus')}, function(o){
			posts.list(function(e, subs){
				res.render('index', { title: 'Lista de posts', error:o, blogs: subs });
			})
		})
	})
	
	app.post('/save', function(req,res){
		SU.edit({name: req.param('name'), email:req.param('email'), id:req.param('id')}, function(o){
			if(o){
				res.redirect('/');
			}else{
				resp.send('Error al actualiza registro',400)
			}
		})
	})
	
	app.post('/delete', function(req, res){
		SU.delete(req.body.id, function(e,obj){
			if(!e){
				res.send('ok',200)
			}else{
				res.send('El subscriptor a eliminar no existe', 400)
			}
			
		})
	})
	
}*/