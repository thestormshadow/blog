// Initialize connection once
var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient;
//var db;
var BLOG = {};
//MongoClient.connect("mongodb://localhost:27017/blogjvr94", function(err, database) {
MongoClient.connect("mongodb://wwwcodeingenius:25661483@waffle.modulusmongo.net:27017/r6asEmen", function(err, database) {
    if(err) throw err;
    BLOG.db = database;
    BLOG.posts = database.collection('posts');
    BLOG.usuarios = database.collection('usuarios');
    BLOG.cuentas = database.collection('cuentas');
    console.log("Conectado ala db correctamente");
});

exports.Connect = function (callback) {    
    callback(BLOG);
};

exports.MongoClient = MongoClient;
exports.ObjectID = mongodb.ObjectID;

