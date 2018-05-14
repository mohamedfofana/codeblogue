var restful = require('node-restful');

module.exports = function(app, route){
	// On ajoute les methode REST au controller
	var rest = restful.model(
		'iname',
		app.models.article
		).methods(['get','put','post']);

	// On sauvegarde le service rest dans l'application
	rest.register(app, route);

	// On retourn le middleware
	return function(req, res, next){
		next();
	};
};