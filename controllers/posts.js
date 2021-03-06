var modelPosts = require('../models/ModelBlogs');
var modelMenus = require('../models/ModelMenus');
var ObjectID = require('mongodb').ObjectID;

var posts = {

list: function(req, res){
    modelPosts.list({"Estatus":1},function(e, resp){
        modelMenus.list({"Estatus":1},function(e, respMenus){
            res.render('index', { error:'', dataposts: resp, menus: respMenus });
        })          
    })
},
    
new: function(req, res){
    modelPosts.list({},function(e, resp){
        res.render('pruebaindex', { error:'', dataposts: resp });
    })
},

post: function(req, res){
    var findobj = (req.body.query.includes("#")==false) ? {"Titulo": new RegExp(req.body.query, 'i')}:{"Tags.texttag": req.body.query};
    modelPosts.list(findobj,function(e, resp){
        modelMenus.list({"Estatus":1},function(e, respMenus){
            res.render('find', { error:'', datapost: resp, menus: respMenus });
        })
    })
},

    
get: function(req, res){
    if(req.query.sif != null){
        modelPosts.list({"_id":modelPosts.getObjectId(req.query.sif),"Estatus":1},function(e, respPost){
            modelPosts.comentariosPost({"idPost":modelPosts.getObjectId(req.query.sif),"Estatus":1},function(e, respComents){
                modelMenus.list({"Estatus":1},function(e, respMenus){
                    res.render('post', { error:'', datapost: respPost, datacoments: respComents, menus: respMenus });
                })
            })
        })
    }
    else{            
        res.redirect('/');
    }
},

del: function(req, res){
    res.send('delete posts (not working)');
},
    
postComent: function(req, res){
    var hex = /[0-9A-Fa-f]{6}/g;
    var idpost = (hex.test(req.param('idPost')))? ObjectID(req.param('idPost')) : req.param('idPost');
    var idusuario = (hex.test(req.param('idUsuario')))? ObjectID(req.param('idUsuario')) : req.param('idUsuario');
    modelPosts.registrarComentario({
        "idPost":idpost,
        "idUsuario":idusuario,
        "Contenido":req.param('Contenido'),
        "Fecha":new Date(),
        "Like":0,
        "Estatus":1
    });
    res.send('OK');
        
},

editComent:function(req, res){
    var hex = /[0-9A-Fa-f]{6}/g;
    var idcoment = (hex.test(req.param('idComent')))? ObjectID(req.param('idComent')) : req.param('idComent');
    modelPosts.actualizaComentario({"_id":idcoment},{"Contenido":req.param('contenido')});
    res.send('OK');
},

delComent: function(req, res){
    var hex = /[0-9A-Fa-f]{6}/g;
    var idcoment = (hex.test(req.param('idComent')))? ObjectID(req.param('idComent')) : req.param('idComent');
    modelPosts.eliminaComentario({
        "_id":idcoment
    });
    res.send('OK');
},

postLikeComentAjax: function(req, res){
    var hex = /[0-9A-Fa-f]{6}/g;
    var idComent = (hex.test(req.param('idComent')))? ObjectID(req.param('idComent')) : req.param('idComent');
    modelPosts.ActualizarComentario({"_id":idComent});
    res.send('OK');
},

likeComent: function(req, res){
    var hex = /[0-9A-Fa-f]{6}/g;
    var idcomentario = (hex.test(req.param('idComent')))? ObjectID(req.param('idComent')) : req.param('idComent');
    var idusuario = (hex.test(req.param('idUsuario')))? ObjectID(req.param('idUsuario')) : req.param('idUsuario');
    modelPosts.registrarLikeComent({
        "idComent":idcomentario,
        "idUsuario":idusuario,
        "Fecha":new Date()
    });
    res.send('OK');
},

delLikeComent: function(req,res){
    var hex = /[0-9A-Fa-f]{6}/g;
    var idcomentario = (hex.test(req.param('idComent')))? ObjectID(req.param('idComent')) : req.param('idComent');
    var idusuario = (hex.test(req.param('idUsuario')))? ObjectID(req.param('idUsuario')) : req.param('idUsuario');
    modelPosts.eliminarLikeComent({
        "idComent":idcomentario,
        "idUsuario":idusuario
    });
    res.send('OK');
},

likePost: function(req, res){
    var hex = /[0-9A-Fa-f]{6}/g;
    var idpost = (hex.test(req.param('idPost')))? ObjectID(req.param('idPost')) : req.param('idPost');
    var idusuario = (hex.test(req.param('idUsuario')))? ObjectID(req.param('idUsuario')) : req.param('idUsuario');
    modelPosts.registrarLikePost({
        "idPost":idpost,
        "idUsuario":idusuario,
        "Fecha":new Date()
    });
    res.send('OK');
},

delLikePost: function(req,res){
    var hex = /[0-9A-Fa-f]{6}/g;
    var idpost = (hex.test(req.param('idPost')))? ObjectID(req.param('idPost')) : req.param('idPost');
    var idusuario = (hex.test(req.param('idUsuario')))? ObjectID(req.param('idUsuario')) : req.param('idUsuario');
    modelPosts.eliminarLikePost({
        "idPost":idpost,
        "idUsuario":idusuario
    });
    res.send('OK');
}
};

exports.posts = posts;