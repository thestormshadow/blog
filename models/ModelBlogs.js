var Connect = require('./conex').Connect;
var ObjectID = require('mongodb').ObjectID;

var RespModel = {};

RespModel.list = function(finded,callback){
    Connect(function(BLOG){
        BLOG.posts.aggregate([{
            $lookup:{
                from: "usuarios",
                localField: "Autor",
                foreignField: "_id",
                as: "Autor"
            }
        },
        { $unwind: "$Autor"},
        { $match: finded },
        { $sort: {"Postdir": -1}  }
        ]).toArray(function(e,res){
		if(e){
			callback(e)
		}else{
			callback(null, res)
		}
	})
})
}

RespModel.comentariosPost = function(finder,callback){
    Connect(function(BLOG){
        BLOG.comentariosPost.aggregate([{
            $lookup:{
                from: "usuarios",
                localField: "idUsuario",
                foreignField: "_id",
                as: "Autor"
            }
        },
        { $unwind: "$Autor"},
        { $match: finder }
        ]).toArray(function(e,res){
		if(e){
			callback(e)
		}else{
			callback(null, res)
		}
	})
})
}

RespModel.registrarComentario = function (newData){
    Connect(function(BLOG){               
			     BLOG.comentariosPost.insert(newData);
    })
}

RespModel.actualizaComentario = function (Data,newData){
    Connect(function(BLOG){               
			     BLOG.comentariosPost.update(Data,{ $set: newData });
    })
}

RespModel.eliminaComentario = function (Data){
    Connect(function(BLOG){               
			     BLOG.comentariosPost.update(Data,{ $set: {Estatus:0} });
    })
}

RespModel.ActualizarComentario = function(finder){
    Connect(function(BLOG){
        BLOG.comentariosPost.updateOne(finder,
        {
            $inc: { Like: 1 }
        })
    })
}

RespModel.getObjectId = function(id){
    return ObjectID.createFromHexString(id);
}


module.exports = RespModel;