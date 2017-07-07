var Connect = require('./conex').Connect;
var ObjectID = require('mongodb').ObjectID;

var RespModel = {};

RespModel.list = function(where,callback){
    Connect(function(BLOG){
        BLOG.menu.find({$where: "this.Estatus == 1"}).sort({ID_menu:1}).toArray(function(e,res){
		if(e){
			callback(e)
		}else{
			callback(null, res)
		}
	})
})
}

module.exports = RespModel;