// On importe mongoose comme il sera utiliser
var mongoose = require('mongoose');
	//exports  = module.exports = {};
var ReplySchema = new mongoose.Schema({
	author: {
		type : String,
		require : true
	},
	contenu: {
		type : String,
		require : true
	},
	article_titre: {
		type : String,
		require : true
	},
	comment_creation: {
		type : Date,
		require : false,
		default : Date.now
	},
	comment_author: {
		type : String,
		require : false,
		default : 0
	},
	creation: {
		type : Date,
		require : false,
		default : Date.now
	},
	likes: {
		type : Number,
		require : false,
		default : 0
	}
});
// On declare le model User dans mongoose
module.exports = ReplySchema;
