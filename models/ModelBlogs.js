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

RespModel.getObjectId = function(id){
    return ObjectID.createFromHexString(id);
}


module.exports = RespModel;