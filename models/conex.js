// Initialize connection once
var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient;
//var db;
var BLOG = {};
//MongoClient.connect("mongodb://localhost:27017/blogjvr94", function(err, database) {
MongoClient.connect("mongodb://blogjvr94:25661483@ds045632.mlab.com:45632/blogjvr94", function(err, database) {
    if(err) throw err;
    BLOG.db = database;
    BLOG.posts = database.collection('posts');
    BLOG.usuarios = database.collection('usuarios');
    BLOG.cuentas = database.collection('cuentas');
    BLOG.comentariosPost = database.collection('comentariosPost');
    BLOG.comentariosLike = database.collection('comentariosLike');
    BLOG.menu = database.collection('menu');
    BLOG.postsLike = database.collection('postsLike');
    console.log("Conectado ala db correctamente");
});

exports.Connect = function (callback) {    
    callback(BLOG);
};

exports.MongoClient = MongoClient;
exports.ObjectID = mongodb.ObjectID;

