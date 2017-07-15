var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/User');
var configAuth = require('./config');

module.exports = function (passport) {
    passport.use(new GitHubStrategy({
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL
    }, function (accessToken, refreshToken, profile, done) {
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
}