var User = require('../models/User');
var local = require('./local');
var github = require('./github');
var twitter = require('./twitter');

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

    local(passport);
    github(passport);
    twitter(passport);
};
