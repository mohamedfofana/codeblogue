// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

// load up the user model
var User = require('../models/User');

// load the auth variables
var configAuth = require('./config');

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // code for signup (use('local-signup', new LocalStategy))
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, username, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            let email = req.body.email;
            User.findOne({ 'local.username': username }, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err) {
                    //console.log('there are any errors, return the error before anything else');
                    return done(err);
                }
                // if no user is found, return the message
                if (!user) {
                    User.findOne({ 'local.email': email }, function (err, user) {
                        if (err) {
                            //console.log('there are any errors, return the error before anything else');
                            return done(err);
                        }
                        if (user) {
                            //console.log('Email utilisé.');
                            return done(null, false, { message: 'email' });
                        } else {
                            // if there is no user with that email
                            // create the user
                            var newUser = new User();

                            // set the user's local credentials
                            newUser.local.email = email;
                            newUser.local.username = username;
                            newUser.local.password = newUser.generateHash(password);

                            // save the user
                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                //console.log('Utilisateur créé.');
                                return done(null, newUser);
                            });
                        }
                    });
                } else {
                    //console.log('Ce pseudo existe déjà.');
                    return done(null, false, { message: 'pseudo' });
                }
            });

        }));
        
    // code for signin (use('local-signin', new LocalStategy))
    passport.use('local-signin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email': email}, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err) {
                    console.log('there are any errors, return the error before anything else');
                    return done(err);
                }
                // if no user is found, return the message
                if (!user) {
                    console.log('no user is found, return the message');
                    return done(null, false, { message: 'email' }); // req.flash is the way to set flashdata using connect-flash
                } 
                // if the user is found but the password is wrong
                if (!user.validPassword(password)){
                    console.log('the user is found but the password is wrong');
                    return done(null, false, { message: 'password' }); // create the loginMessage and save it to session as flashdata
                }
                // all is well, return successful user
                console.log('all is well, return successful user');
                return done(null, user);
        });

    }));
// code for google (use('google', new GoogleStrategy))
// code for facebook (use('facebook', new FacebookStrategy))
// code for twitter (use('twitter', new TwitterStrategy))
// code for github (use('github', new GithubStrategy))
// code for linkedin (use('linkedin', new LinkedinStrategy))

};
