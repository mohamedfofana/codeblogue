module.exports = function(passport) {
    console.log("google");
    return passport.authenticate('google', { scope : ['profile', 'email'] });
    // On retourn le middleware
	/*return function(req, res, next){
		next();
	};
    */
}