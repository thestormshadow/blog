var BLOG = require('../models/conex'); 

BLOG.cuentas.checkLogin = function(req,callback){
	BLOG.cuentas.find(req).toArray(function(e,res){
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

BLOG.cuentas.registrar = function(newData,callback){    
    BLOG.cuentas.findOne({Correo: newData.Correo}, function(e,obj){
		if(obj){
			callback('El correo ya existe.');
		}else{
            BLOG.cuentas.findOne({Usuario: newData.Usuario}, function(e,obj){
		      if(obj){
			     callback('El usuario ya existe.');
		      }else{                 
			     BLOG.cuentas.insert(newData);
                 BLOG.cuentas.find({Correo: newData.Correo}).toArray(function(e,reslist){
                    if(e){
			             callback(e)
		            }else{
			            console.log("Cuenta "+newData.Usuario+" correctamente creada");
                        callback(null ,reslist);
		                  }
                })
              }
            })
        }
    })
}
                 

BLOG.cuentas.list = function(objfind,callback){
	BLOG.cuentas.find(objfind).toArray(function(e,res){
		if(e){
			callback(e)
		}else{
			callback(null, res)
		}
	})
}
module.exports = BLOG;