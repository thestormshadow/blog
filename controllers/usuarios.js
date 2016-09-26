var modelUsuarios = require('../models/Modelusuarios');

var usuarios = {
    
    list: function(req, res){
        modelPosts.list({},function(e, resp){
            res.render('index', { error:'', dataposts: resp });
        })
    }

    
};

exports.usuarios = usuarios;