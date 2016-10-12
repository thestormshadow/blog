var modelCuentas = require('../models/ModelCuentas');
var modelUsuarios = require('../models/ModelUsuarios');

var cuentas = {
    
    getPageLogin: function(req, res){
        if (req.session.idCuenta == null){
            res.render('cuenta', { type:'login' });
        }
        else{
            res.redirect('/');
        }
    },
    
    getPageRegistro: function(req, res){
        if (req.session.idCuenta == null){
            res.render('cuenta', { type:'registro' });
        }
        else{
            res.redirect('/');
        }
    },
    
    getPagePanel: function(req, res){
        if (req.session.idCuenta == null){
            res.render('cuenta', { type:'registro'});
        }
        else{
            res.redirect('/');
        }
    },
    
    post: function(req, res){
        if(req.param('RegPassword') == req.param('RegRPassword'))
            {
                modelCuentas.registrar({
                    Usuario:req.param('RegUsuario'),
                    Password:req.param('RegPassword'),
                    Correo:req.param('RegCorreo'),
                    Tipo:1,
                    AvisoPrivacidad:0,
                    CorreoConfirm:1,
                    Estatus:1
                },function(e, resultCuenta){
                    modelUsuarios.registrar({
                    idCuenta:resultCuenta[0]._id,
                    Nombre:req.param('RegNombre'),
                    Apellidos:req.param('RegApellidos'), 
                    Nick:req.param('RegNombre').trim()+req.param('RegApellidos').trim(),
                    Pais:req.param('pais'),
                    UrlAvatar:'images/avatar-new.jpg',
                    FechaAlta:new Date(),
                    Estatus: 1
                    },function(e,resultUsuario){
                        modelCuentas.checkLogin({
                        Usuario: req.param('RegUsuario'),
                        Password: req.param('RegPassword')
                        },function(e, subs){
                            if(subs.Responseprop == true){
                                req.session.idCuenta = resultCuenta[0]._id;
                                req.session.idUsuario = resultUsuario[0]._id;
                                req.session.nombre = resultUsuario[0].Nombre;
                                req.session.avatar = resultUsuario[0].UrlAvatar;
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
    },
    
    postSession: function(req, res){
        if(req.param('isUsuario') != "" && req.param('isPassword') != "")
            {       
                modelCuentas.checkLogin({Usuario:req.param('isUsuario'), Password:req.param('isPassword')}, function(e, subs){
                    if(subs.Responseprop == true){                
                       req.session.idCuenta = subs.resulted[0]._id; 
                       modelUsuarios.list({"idCuenta":subs.resulted[0]._id}, function(e,respon){
                            if(respon != null){
                                req.session.idUsuario = respon[0]._id;
                                req.session.nombre = respon[0].Nombre;
                                req.session.avatar = respon[0].UrlAvatar;
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
    },
    
    postSessionAjax: function(req, res){
        if(req.param('isUsuario') != "" && req.param('isPassword') != "")
            {       
                modelCuentas.checkLogin({Usuario:req.param('isUsuario'), Password:req.param('isPassword')}, function(e, subs){
                    if(subs.Responseprop == true){                
                       req.session.idCuenta = subs.resulted[0]._id; 
                       modelUsuarios.list({"idCuenta":subs.resulted[0]._id}, function(e,respon){
                            if(respon != null){
                                req.session.idUsuario = respon[0]._id;
                                req.session.nombre = respon[0].Nombre;
                                req.session.avatar = respon[0].UrlAvatar;
                                req.session.correo = subs.resulted[0].Correo;
                                req.session.tipousuario = subs.resulted[0].Tipo;
                                res.send(true);
                            }
                        }) 
                    }else{
                        res.send('false');
                    }
                })
            }
        else{
            res.send('false');
        }
    },

    delSession: function(req, res){
        req.session.destroy(function(err){
            if(err){
                console.log(err);
            }
            else
            {
                res.redirect('/');
            }
        });
    }
};

exports.cuentas = cuentas;