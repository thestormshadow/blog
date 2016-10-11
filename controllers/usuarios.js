var modelUsuarios = require('../models/Modelusuarios');

var usuarios = {
    
    get: function(req, res){
        modelUsuarios.list({},function(e, resp){
            res.render('usuario', { error:'', dataUsuario: resp });
        })
    }

    
};

exports.usuarios = usuarios;