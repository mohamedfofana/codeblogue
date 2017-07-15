var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var configAuth = require('./config');

module.exports = function (passport) {
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            let email = req.body.email;
            User.findOne({ 'local.username': username }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    User.findOne({ 'local.email': email }, function (err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            return done(null, false, { message: 'email' });
                        } else {
                            var newUser = new User();
                            newUser.local.email = email;
                            newUser.local.username = username;
                            newUser.local.password = newUser.generateHash(password);
                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }
                    });
                } else {
                    return done(null, false, { message: 'pseudo' });
                }
            });

        }));

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'email' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'password' });
                }
                return done(null, user);
            });

        }));
}