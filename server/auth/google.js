var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/User');
var configAuth = require('./config');

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    }, function (accessToken, refreshToken, profile, done) {
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
                    newUser.google.email = (profile.emails[0].value || '').toLowerCase();
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
}