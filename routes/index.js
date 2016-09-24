var modelPosts = require('../models/posts') 
var modelcuentas = require('../models/cuentas') 
var modelusuarios = require('../models/usuarios')

module.exports = function(app){
	
    //post
	app.get('/', function(req, res){
		modelPosts.posts.list({},function(e, resp){
            console.log(resp);
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
        if (req.session.idCuenta == null){
            res.render('cuenta', { type:'login' });
        }
        else{
            res.redirect('/');
        }
		
	})
    
    app.get('/cuenta/registro', function(req, res){
        if (req.session.idCuenta == null){
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
                modelcuentas.cuentas.checkLogin({Usuario:req.param('isUsuario'), Password:req.param('isPassword')}, function(e, subs){
                    if(subs.Responseprop == true){                
                       req.session.idCuenta = subs.resulted[0]._id; 
                       modelusuarios.usuarios.list({idCuenta:''+subs.resulted[0]._id+''}, function(e,respon){
                            if(respon != null){
                                req.session.idUsuario = respon[0]._id;
                                req.session.nombre = respon[0].Nombre;
                                req.session.correo = subs.resulted[0].Correo;
                                req.session.tipousuario = subs.resulted[0].Tipo;
                                res.redirect('/');
                            }
                        })                  
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
                modelcuentas.cuentas.registrar({
                    Usuario:req.param('RegUsuario'),
                    Password:req.param('RegPassword'),
                    Correo:req.param('RegCorreo'),
                    Tipo:1,
                    AvisoPrivacidad:0,
                    CorreoConfirm:1,
                    Estatus:1
                },function(e, resultCuenta){
                    modelusuarios.usuarios.registrar({
                    idCuenta:''+resultCuenta[0]._id+'',
                    Nombre:req.param('RegNombre'),
                    Apellidos:req.param('RegApellidos'),                
                    Pais:req.param('pais'),
                    Estatus: 1
                    },function(e,resultUsuario){
                        modelcuentas.cuentas.checkLogin({
                        Usuario: req.param('RegUsuario'),
                        Password: req.param('RegPassword')
                        },function(e, subs){
                            if(subs.Responseprop == true){
                                req.session.idCuenta = resultCuenta[0]._id;
                                req.session.idUsuario = resultUsuario[0]._id;
                                req.session.nombre = resultUsuario[0].Nombre;
                                req.session.correo = resultCuenta[0].Correo;
                                req.session.tipousuario = resultCuenta[0].Tipo;
                                res.redirect('/');        
                            }else{
                                res.redirect('/cuenta/login');
                            }
                        })
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