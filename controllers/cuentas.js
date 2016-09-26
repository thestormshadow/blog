var modelCuentas = require('../models/ModelCuentas');

var cuentas = {
    
    post: function(req, res){
    var findobj = (req.body.query.includes("#")==false) ? {"Titulo": new RegExp(req.body.query, 'i')}:{"Tags.texttag": req.body.query};
        modelPosts.list(findobj,function(e, resp){
            res.render('find', { error:'', datapost: resp });
        })
    },
    
    get: function(req, res){
        if (req.session.idCuenta == null){
            res.render('cuenta', { type:'login' });
        }
        else{
            res.redirect('/');
        }
    },
    
    post: function(req, res){
        if(req.param('isUsuario') != "" && req.param('isPassword') != "")
            {       
                modelCuentas.checkLogin({Usuario:req.param('isUsuario'), Password:req.param('isPassword')}, function(e, subs){
                    if(subs.Responseprop == true){                
                       req.session.idCuenta = subs.resulted[0]._id; 
                       
                       res.redirect('/');
                    }else{
                        res.redirect('/cuenta/login');
                    }
                })
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