var BLOG = require('../models/conex'); 

BLOG.usuarios.list = function(callback){
	BLOG.usuarios.find({}).sort( { Credencial: -1 } ).toArray(function(e,res){
		if(e){
			callback(e)
		}else{
			callback(null, res)
		}
	})
}
BLOG.usuarios.checkLogin = function(req,callback){
	BLOG.usuarios.find(req).toArray(function(e,res){
		if(e){
			callback(e)
		}else{
            if(res.length != 0){                
               callback(null, {Responseprop:true,resulted:res});
               console.log("Usuario "+req.Usuario+" correctamente logeado");
            }else{
               callback(null, false);
            }			
		}
	})
}
BLOG.usuarios.registrar = function(newData,callback){    
    BLOG.usuarios.findOne({Correo: newData.Correo}, function(e,obj){
		if(obj){
			callback('El correo ya existe.');
		}else{
            BLOG.usuarios.findOne({Usuario: newData.Usuario}, function(e,obj){
		      if(obj){
			     callback('Ese usuario ya existe.');
		      }else{
			     BLOG.usuarios.insert(newData, callback(null))
                 console.log("Usuario "+newData.Usuario+" correctamente creado");
		      }
		  })
        }
    })
}
module.exports = BLOG;
/*
BLOG.edit = function(newData, callback){
	BLOG.posts.findOne({_id: this.getObjectId(newData.id)}, function(e,o){
		o.name = newData.name;
		o.email = newData.email;
		BLOG.posts.save(o);
		callback(o);
	})
}

BLOG.delete = function(id, callback){
	BLOG.posts.remove({_id: this.getObjectId(id)},callback)
}


BLOG.getObjectId = function(id){
	return BLOG.posts.db.bson_serializer.ObjectID.createFromHexString(id)
}
*/



