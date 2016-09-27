postsController = require("./posts");
cuentasController = require("./cuentas");

module.exports = function(app){
    app.map({
    
    //Posts
    '/': {
        get: postsController.posts.list,
        'post':{
            get: postsController.posts.get,
            '/find':{
            post: postsController.posts.post
            },
        },
    },    
        
    //Cuentas
    '/cuenta': {
        '/login':{
            get: cuentasController.cuentas.getPageLogin,
            '/checklogin':{
            post: cuentasController.cuentas.postSession
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
        '/:uid':{
            get: cuentasController.cuentas.getPagePanel
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