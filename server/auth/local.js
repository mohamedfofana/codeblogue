var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

module.exports = function (passport) {
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            User.findOne({ 'email': email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false, { message: 'email' });
                } else {
                    var newUser = new User();
                    newUser.email = email;
                    newUser.firstname = req.body.firstname;
                    newUser.lastname = req.body.lastname;
                    newUser.email = req.body.email;
                    newUser.phonenumber = req.body.phonenumber;
                    newUser.address = req.body.address;
                    newUser.additional_address = req.body.additional_address;
                    newUser.zipcode = req.body.zipcode;
                    newUser.city = req.body.city;
                    newUser.country = req.body.country;
                    newUser.password = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
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
