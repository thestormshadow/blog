var BLOG = require('../models/conex'); 

/*
BLOG.new = function(newData, callback){
	BLOG.posts.findOne({Titulo: newData.Titulo}, function(e,obj){
		if(obj){
			callback('Ese Titulo ya existe.');
		}else{
			BLOG.posts.insert(newData, callback(null))
		}
	})
}
*/
BLOG.posts.list = function(finded,callback){
	BLOG.posts.find(finded).sort( { Postdir: -1 } ).toArray(function(e,res){
		if(e){
			callback(e)
		}else{
			callback(null, res)
		}
	})
}

BLOG.posts.getObjectId = function(id){
	return BLOG.posts.db.bson_serializer.ObjectID.createFromHexString(id)
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



