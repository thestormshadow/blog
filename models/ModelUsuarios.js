var Connect = require('./conex').Connect;
var ObjectID = require('mongodb').ObjectID;

var RespModel = {};

RespModel.list = function(findData,callback){
    Connect(function(BLOG){
        BLOG.usuarios.aggregate([{
            $lookup:{
                from: "cuentas",
                localField: "idCuenta",
                foreignField: "_id",
                as: "CuentaInfo"
            }            
        },
        { $unwind: "$CuentaInfo"},
        /*{
            $lookup:{
                from: "posts",
                localField: "_id",
                foreignField: "Autor",
                as: "PostsInfo"
            }            
        },*/
        { $match: findData }
        ]).toArray(function(e,res){
		if(e){
			callback(e)
		}else{
			callback(null, res)
        }
        
	})
	})
}

RespModel.registrar = function(newData,callback){
    Connect(function(BLOG){
        BLOG.usuarios.insert(newData);
        BLOG.usuarios.find({"idCuenta":newData.idCuenta}).toArray(function(e,res){
        if(e){
			callback(e)
		}else{
			callback(null, res)
		}
    });
    console.log("Usuario "+newData.Nombre+" correctamente creado");
	})
}

RespModel.getObjectId = function(id){
    return ObjectID.createFromHexString(id);
}


module.exports = RespModel;