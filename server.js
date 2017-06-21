//console.log("hello from node");

var express 	  		= require('express'),
    bodyParser     	= require('body-parser'),
    mongoose	   		= require('mongoose'),    
    methodOverride 	= require('method-override'),
 	  _ 					    = require('lodash'),
    mongodbServer   = 'mongodb://localhost:27017/codeblogue',
    path            = require('path');
    PORT            = 8080;        

// creation de l'application
var app = express();

// Add Middleware necessary for REST API's 
app.use(bodyParser.urlencoded({extended: true})); // URL encoding replaces unsafe ASCII characters with a "%" followed by two hexadecimal digits.
app.use(bodyParser.json()); // Intercepte une requête pour lui dire d'utiliser l'encodage json
app.use(methodOverride('X-HTTP-Method-Override')); // pour accepter Method -Override. Cela permet d'utiliser les methodes http put , ...

// CORS Support
// CORS allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the resource  
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // * signifie tous les domaines peuvent se connecter à notre API
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
   // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
});
//On se connecte à mongodb
mongoose.connect(mongodbServer)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  	// Point static path to dist
    app.use(express.static(path.join(__dirname, 'dist')));
  	
    // Charmgement des models.
  	app.models = require('./server/models/index');

    // Chargement des routes.
    var routes = require('./server/routes');
    _.each(routes, function(controller, route) {
         var theCtrl = require(controller);
         app.use(route, theCtrl(app, route));
    });

    // Catch all ot/ Point static path to dist
        app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, 'dist/index.html'));
        });

  	// Démarrage du server
	app.listen(PORT, function(){
		console.log('listening on port ' + PORT + '...');
	});
});