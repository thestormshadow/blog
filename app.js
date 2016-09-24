
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
var env = process.env.NODE_ENV || 'development';


  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(logErrors);
  app.use(clientErrorHandler);
  app.use(errorHandler);
  app.use(function(){
      express.static(path.join(__dirname, 'public'));
  });
  app.use(function(){express.session();});

  function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
  }
  function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
  }
  function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

  /*app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('jvr451dasdas4d861asd'));
  app.use(express.session());
    
  app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
  });
    
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));


if ('development' == env) {
  app.use(express.errorHandler());
}
*/

require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
