var BLOG = require('../models/conex'); 

BLOG.usuarios.list = function(findData,callback){
	BLOG.usuarios.find(findData).toArray(function(e,res){
		if(e){
			callback(e)
		}else{
			callback(null, res)
		}
	})
}

BLOG.usuarios.registrar = function(newData,callback){
    BLOG.usuarios.insert(newData);
    BLOG.usuarios.find({"idCuenta":''+newData.idCuenta+''}).toArray(function(e,res){
        if(e){
			callback(e)
		}else{
			callback(null, res)
		}
    });
    console.log("Usuario "+newData.Nombre+" correctamente creado");
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



