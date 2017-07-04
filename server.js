//console.log("hello from node");

var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  flash = require('connect-flash'),
  _ = require('lodash'),
  mongodbServer = 'mongodb://localhost:27017/codeblogue',
  path = require('path'),
  PORT = 8080;

require('./server/auth/passport')(passport);

// creation de l'application
var app = express();

// Add Middleware necessary for REST API's 
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true })); // URL encoding replaces unsafe ASCII characters with a "%" followed by two hexadecimal digits.
app.use(bodyParser.json()); // Intercepte une requête pour lui dire d'utiliser l'encodage json
app.use(methodOverride('X-HTTP-Method-Override')); // pour accepter Method -Override. Cela permet d'utiliser les methodes http put , ...


// required for passport
app.use(session({ secret: 'memfst' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// CORS Support
// CORS allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the resource  
app.use(function (req, res, next) {
  //console.log(res);
  res.header('Access-Control-Allow-Origin', '*'); // * signifie tous les domaines peuvent se connecter à notre API
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept');
  // intercept OPTIONS method
  //if ('OPTIONS' == req.method) {
  //  res.sendStatus(200);
  //}
  //else {
  next();
  // }
});

app.use(require('express-session')({
  resave: false,
  saveUninitialized: false,
  secret: 'memfst'
}));

//On se connecte à mongodb
mongoose.connect(mongodbServer)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // Point static path to dist
  app.use(express.static(path.join(__dirname, 'dist')));

  // Charmgement des models.
  app.models = require('./server/models/index');

  // Chargement des routes.
  var routes = require('./server/routes');
  _.each(routes, function (controller, route) {
    var theCtrl = require(controller);
    app.use(route, theCtrl(app, route));
  });

  // Chargement des routes auth.
  // process the login form
  app.post('/api/auth/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) { 
        return next(err); 
      }
      if (!user) { 
        return res.redirect('/login'); 
      }
      req.logIn(user, function (err) {
        if (err) { 
          return next(err); 
        }
        return res.redirect('/' + user.local.name);
      });
    })(req, res, next);
  });

  app.get('/api/auth/google', passport.authenticate('google', { scope: "email" }));
  app.get('/api/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/' }));
  /*
    var routesAuth = require('./server/routes.auth');
    _.each(routesAuth, function (controller, routeAuth) {
      var theCtrl = require(controller);
      console.log(routeAuth);
      app.get(routeAuth, theCtrl(passport));
    });
  */
  // Todo ajouter les routes avec app get ./server/routes_auth
  // Ajouter les controller avec app.get

  // Catch all ot/ Point static path to dist
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

  // Démarrage du server
  app.listen(PORT, function () {
    console.log('listening on port ' + PORT + '...');
  });
});
