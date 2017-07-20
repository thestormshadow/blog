var modelUsuarios = require('../models/ModelUsuarios');
var modelPosts = require('../models/ModelBlogs');
var modelMenus = require('../models/ModelMenus');

var usuarios = {
    
    get: function(req, res){
        modelUsuarios.list({Nick:req.params.nick},function(e, resp){
            if(resp.length != 0){
                modelMenus.list({"Estatus":1},function(e, respMenus){
                         modelPosts.list({"Estatus":1,"Autor._id":resp[0]._id},function(e, respPosts){
                            res.render('usuario', { error:'', dataUsuario: resp, menus: respMenus, postsInfo: respPosts });
                         })
                })
            }
            else{
                res.redirect('/');
            }
            
        })
    }

    
};

exports.usuarios = usuarios;