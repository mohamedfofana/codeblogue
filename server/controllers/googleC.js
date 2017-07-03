module.exports = function(passport) {
      console.log("googleC");
    passport.authenticate('google', { successRedirect: '/profile', failureRedirect: '/' });
    // On retourn le middleware
	/*return function(req, res, next){
		next();
	};
    */
}