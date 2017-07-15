var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');
var configAuth = require('./config');

module.exports = function (passport) {
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL

    }, function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = profile.displayName;
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
}