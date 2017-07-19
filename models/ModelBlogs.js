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
        {
            $lookup:{
                from: "postsLike",
                localField: "_id",
                foreignField: "idPost",
                as: "LikesPostInfo"
            }
        },
        {
            $lookup:{
                from: "comentariosPost",
                localField: "_id",
                foreignField: "idPost",
                as: "Comentarios"
            }
        },
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
        {
            $lookup:{
                from: "comentariosLike",
                localField: "_id",
                foreignField: "idComent",
                as: "LikesInfo"
            }
        },
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

RespModel.registrarLikeComent = function(newLike){
    Connect(function(BLOG){
        BLOG.comentariosLike.insert(newLike);
    })
}

RespModel.eliminarLikeComent = function(dataLike){
    Connect(function(BLOG){
        BLOG.comentariosLike.remove(dataLike);
    })
}

RespModel.registrarLikePost = function(newLike){
    Connect(function(BLOG){
        BLOG.postsLike.insert(newLike);
    })
}

RespModel.eliminarLikePost = function(dataLike){
    Connect(function(BLOG){
        BLOG.postsLike.remove(dataLike);
    })
}

RespModel.getObjectId = function(id){
    return ObjectID.createFromHexString(id);
}


module.exports = RespModel;