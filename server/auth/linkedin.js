var LinkedInStrategy = require('passport-linkedin').Strategy;
var User = require('../models/User');
var configAuth = require('./config');

module.exports = function (passport) {
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
    }));
}