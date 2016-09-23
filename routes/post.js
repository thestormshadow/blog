var modelPosts = require('../models/posts');

var postroute = function(app){
	
	app.get('/', function(req, res){
		modelPosts.posts.list(function(e, resp){
			res.render('index', { error:'', dataposts: resp });
		})
		
	})    
}

module.exports = postroute;