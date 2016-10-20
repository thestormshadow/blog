var modelUsuarios = require('../models/ModelUsuarios');

var usuarios = {
    
    get: function(req, res){
        modelUsuarios.list({Nick:req.params.nick},function(e, resp){
            if(resp.length != 0){
                res.render('usuario', { error:'', dataUsuario: resp });
            }
            else{
                res.redirect('/');
            }
            
        })
    }

    
};

exports.usuarios = usuarios;