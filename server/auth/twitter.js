var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/User');
var configAuth = require('./config');

module.exports = function (passport) {
    passport.use(new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL
    }, function (token, tokenSecret, profile, done) {
            process.nextTick(function () {
                User.findOne({ 'twitter.id': profile.id }, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user); 
                    } else {
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
}