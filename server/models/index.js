// On ajoute les models de notre base de donnée
module.exports = {
	user: require('./User'),
	article: require('./Article'),
	comment: require('./Comment'),
	reply: require('./Reply')
};