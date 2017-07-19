postsController = require("./posts");
cuentasController = require("./cuentas");
usuariosController = require("./usuarios");

module.exports = function(app){
    app.map({
    
    //Posts
    '/': {
        get: postsController.posts.list,
        'posts':{
            get: postsController.posts.get,
            '/find':{
            post: postsController.posts.post
            },
            '/postcomentario':{
                post: postsController.posts.postComent,
                '/postcomentlikeajax':{
                    post: postsController.posts.postLikeComentAjax
                },
                '/delcoment':{
                    post: postsController.posts.delComent
                },
                '/editcoment':{
                    post: postsController.posts.editComent
                },
                '/likecoment':{
                    post: postsController.posts.likeComent
                },
                '/dislikecoment':{
                    post: postsController.posts.delLikeComent
                }
            },
            '/likepost':{
                post: postsController.posts.likePost
            },
            '/dislikepost':{
                post: postsController.posts.delLikePost
            }  
        }      
    },    
        
    //Cuentas
    '/cuenta': {
        '/login':{
            get: cuentasController.cuentas.getPageLogin,
            '/checklogin':{
            post: cuentasController.cuentas.postSession
            },
            '/checkloginajax':{
            post: cuentasController.cuentas.postSessionAjax
            },            
            '/cerrarsesion':{
            get: cuentasController.cuentas.delSession
            }
        },
        '/registro':{
            get: cuentasController.cuentas.getPageRegistro,
            '/checkregistro':{
                post: cuentasController.cuentas.post
            }
        },        
    },
        
    //Usuarios
    '/usuarios':{
        '/:nick':{
            get: usuariosController.usuarios.get
        }
    },
    '/new':{
            get: postsController.posts.new
    }
    });
}
/*
app.map({
  '/users': {
    get: users.list,
    del: users.del,
    '/:uid': {
      get: users.get,
      '/pets': {
        get: pets.list,
        '/:pid': {
          del: pets.del
        }
      }
    }
  }
});*/