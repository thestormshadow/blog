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
            get: cuentasController.cuentas.get,
            '/checklogin':{
            post: cuentasController.cuentas.post
            },
            '/cerrarsesion':{
            get: cuentasController.cuentas.delSession
            }
            
        }        
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