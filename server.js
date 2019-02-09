//console.log("hello from node");

var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  methodOverride = require('method-override'),
  cors           = require('cors');
  session = require('express-session'),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  flash = require('connect-flash'),
  _ = require('lodash'),
  mongodbServer = 'mongodb://localhost:27017/codeblogue',
  //mongodbServer = 'mongodb://admin:memfst87cdblg@ds219832.mlab.com:19832/codeblogue';
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
app.use(session({ secret: 'memfst', key: 'sid', resave: true, saveUninitialized: true, cookie: { secure: false }}))
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// CORS Support
app.use(cors());

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
  app.post('/api/auth/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
      if (err) { 
        return next(err); 
      }
      if (!user) { 
        return res.redirect('/signup/' + info.message); 
      }
      req.logIn(user, function (err) {
        if (err) { 
          return next(err); 
        }
        return res.redirect('/' + user.local.username);
      });
    })(req, res, next);
});

  app.post('/api/auth/signin', function (req, res, next) {
    passport.authenticate('local-signin', function (err, user, info) {
      if (err) { 
        return next(err); 
      }
      if (!user) { 
        return res.redirect('/signin/' + info.message); 
      }
      req.logIn(user, function (err) {
        if (err) { 
          return next(err); 
        }
        return res.redirect('/' + user.local.username);
      });
    })(req, res, next);
  });
  // route google auth 
  app.get('/api/auth/google', passport.authenticate('google', { scope: "email" }));
  app.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/auth/success' + req.user.google.name);
    }
  );
  // route facebook auth 
  app.get('/api/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

  app.get('/api/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
       res.redirect('/auth/success' + req.user.facebook.name);
    }
  );

  // route twitter auth 
app.get('/api/auth/twitter', passport.authenticate('twitter'));

app.get('/api/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/auth/success' + req.user.twitter.username);
  });

  // route github auth 
  app.get('/api/auth/github', passport.authenticate('github', { scope : 'email' }));

app.get('/api/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/auth/success' + req.user.github.username);
  });

  // Catch all ot/ Point static path to dist
   app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  }); 
  
  // Démarrage du server
  app.listen(PORT, function () {
    console.log('listening on port ' + PORT + '...');
  });
});
