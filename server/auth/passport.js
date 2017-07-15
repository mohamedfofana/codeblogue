var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GitHubStrategy = require('passport-github').Strategy;
//var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

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
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, username, password, done) { // callback with email and password from our form
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
                                console.log('Utilisateur créé.');
                                return done(null, newUser);
                            });
                        }
                    });
                } else {
                    console.log('Ce pseudo existe déjà.');
                    return done(null, false, { message: 'pseudo' });
                }
            });

        }));

    // code for signin (use('local-signin', new LocalStategy))
    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) { // callback with email and password from our form
            User.findOne({ 'local.email': email }, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err) {
                    return done(err);
                }
                // if no user is found, return the message
                if (!user) {
                    console.log('no user is found, return the message');
                    return done(null, false, { message: 'email' }); // req.flash is the way to set flashdata using connect-flash
                }
                // if the user is found but the password is wrong
                if (!user.validPassword(password)) {
                    console.log('the user is found but the password is wrong');
                    return done(null, false, { message: 'password' }); // create the loginMessage and save it to session as flashdata
                }
                // all is well, return successful user
                console.log('all is well, return successful user');
                return done(null, user);
            });

        }));
    // code for google (use('google', new GoogleStrategy))
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    },
        function (accessToken, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function () {
                User.findOne({ 'google.id': profile.id }, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();
                        newUser.google.id = profile.id;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                        newUser.save(function (err) {
                            if (err)
                                return done(err);
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

    // code for facebook (use('facebook', new FacebookStrategy))
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL

    },
        // facebook will send back the token and profile
        function (token, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function () {
                // find the user in the database based on their facebook id
                User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser = new User();
                        newUser.facebook.id = profile.id; // set the users facebook id                   
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                        newUser.facebook.name = profile.displayName; // look at the passport user profile to see how names are returned
                        // save our user to the database
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));
    // code for twitter (use('twitter', new TwitterStrategy))
    passport.use(new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL
    },
        // asynchronous
        function (token, tokenSecret, profile, done) {
            process.nextTick(function () {
                User.findOne({ 'twitter.id': profile.id }, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser = new User();
                        newUser.twitter.id = profile.id;
                        newUser.twitter.token = token;
                        newUser.twitter.username = profile.username;
                        newUser.twitter.displayName = profile.displayName;
                        newUser.save(function (err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }
                });
            });
        }));
    // code for github (use('github', new GithubStrategy))
    passport.use(new GitHubStrategy({
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL
    },
        function (accessToken, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function () {
                User.findOne({ 'github.id': profile.id }, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();
                        newUser.github.id = profile.id;
                        newUser.github.username = profile.username;
                        newUser.save(function (err) {
                            if (err)
                                return done(err);
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

    // code for linkedin (use('linkedin', new LinkedinStrategy))
    /*
    passport.use(new LinkedInStrategy({
        clientID: configAuth.linkedinAuth.clientID,
        clientSecret: configAuth.linkedinAuth.clientSecret,
        callbackURL: configAuth.linkedinAuth.callbackURL,
        scope: ['r_emailaddress', 'r_basicprofile'],
        state: true
    }, function (accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            User.findOne({ 'linkedin.id': profile.id }, function (err, user) {
                console.log(profile);
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);
                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User();
                    //console.log(profile);
                    // set all of the facebook information in our user model
                    newUser.linkedin.id = profile.id; // set the users facebook id                   
                    //newUser.linkedin.token = token; // we will save the token that facebook provides to the user                    
                    newUser.linkedin.username = profile.displayName; // look at the passport user profile to see how names are returned
                    //newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    // save our user to the database
                    newUser.save(function (err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });
    }));*/
};
