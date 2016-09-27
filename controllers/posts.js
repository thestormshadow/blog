var modelPosts = require('../models/ModelBlogs');

var posts = {
    
    list: function(req, res){
        modelPosts.list({},function(e, resp){
            res.render('index', { error:'', dataposts: resp });
    })
    },
    
    new: function(req, res){
        modelPosts.list({},function(e, resp){
            res.render('pruebaindex', { error:'', dataposts: resp });
    })
    },

    post: function(req, res){
    var findobj = (req.body.query.includes("#")==false) ? {"Titulo": new RegExp(req.body.query, 'i')}:{"Tags.texttag": req.body.query};
        modelPosts.list(findobj,function(e, resp){
            res.render('find', { error:'', datapost: resp });
        })
    },
    
    get: function(req, res){
    if(req.query.sif != null){
        modelPosts.list({"_id": modelPosts.getObjectId(req.query.sif)},function(e, resp){
            res.render('post', { error:'', datapost: resp });
        })
    }
    else{            
        res.redirect('/');
    }
    },

    del: function(req, res){
    res.send('delete posts (not working)');
    }
};

exports.posts = posts;