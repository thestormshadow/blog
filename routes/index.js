var modelPosts = require('../models/posts') 
var modelcuenta = require('../models/cuenta') 

module.exports = function(app){
	
    //post
	app.get('/', function(req, res){
		modelPosts.posts.list({},function(e, resp){
			res.render('index', { error:'', dataposts: resp });
		})		
	})
    
    app.get('/post', function(req, res){
        if(req.query.sif != null){
            modelPosts.posts.list({"_id": modelPosts.posts.getObjectId(req.query.sif)},function(e, resp){
                res.render('post', { error:'', datapost: resp });
		    })
        }
        else{            
            res.redirect('/');
        }
	})
    
    app.post('/post/find', function(req, res){
        var findobj = (req.body.query.includes("#")==false) ? {"Titulo": new RegExp(req.body.query, 'i')}:{"Tags.texttag": req.body.query};
        modelPosts.posts.list(findobj,function(e, resp){
            res.render('find', { error:'', datapost: resp });
        })
	})
    
    //Cuenta
    app.get('/cuenta/login', function(req, res){
        if (req.session.usuario == null){
            res.render('cuenta', { type:'login' });
        }
        else{
            res.redirect('/');
        }
		
	})
    
    app.get('/cuenta/registro', function(req, res){
        if (req.session.usuario == null){
            res.render('cuenta', { type:'registro'});
        }
        else{
            res.redirect('/');
        }
		
	})
    
    app.get('/cuenta/panel', function(req, res){
		res.render('cuenta', { type:'registro'});
	})
    
    app.post('/cuenta/login/checklogin', function(req, res){
        if(req.param('isUsuario') != "" && req.param('isPassword') != "")
            {
                modelcuenta.usuarios.checkLogin({
                Usuario:req.body.isUsuario,
                Password:req.body.isPassword
                }, function(e, subs){
                    if(subs.Responseprop == true){
                        req.session.usuario = req.body.isUsuario;
                        req.session.idusuario = subs.resulted[0]._id;
                        req.session.nombre = subs.resulted[0].Nombre+" "+subs.resulted[0].Apellidos;
                        req.session.correo = subs.resulted[0].Correo;
                        req.session.tipousuario = subs.resulted[0].Tipo;
                        res.redirect('/');
                    }else{
                        res.redirect('/cuenta/login');
                    }
                })
            }
    })
    
    app.get('/cuenta/login/cerrarsesion', function(req, res) {
        req.session.destroy(function(err){
            if(err){
                console.log(err);
            }
            else
            {
                res.redirect('/');
            }
        });
    });
    
    app.post('/cuenta/registro/checkregistro', function(req, res){
        if(req.param('RegPassword') == req.param('RegRPassword'))
            {
                modelcuenta.usuarios.registrar({
                Nombre: req.param('RegNombre'),
                Apellidos: req.param('RegApellidos'),
                Correo: req.param('RegCorreo'),
                Pais: req.param('pais'),
                Usuario: req.param('RegUsuario'),
                Password: req.param('RegPassword'),
                Tipo: 1,
                CorreoConfirm: 1,
                Estatus: 1
                }, function(o,callback){
			         modelcuenta.usuarios.checkLogin({
                        Usuario: req.param('RegUsuario'),
                        Password: req.param('RegPassword')
                    }, function(e, subs){
                        if(subs == true){
                            res.redirect('/');
                        }else{
                            res.redirect('/cuenta/login');
                        }
                    })
		          })
            }
    })
    
}




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