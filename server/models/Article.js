// On importe mongoose comme il sera utiliser
var mongoose = require('mongoose');
	//exports  = module.exports = {};
var ArticleSchema = new mongoose.Schema({ 	
	auteur: {
		type : String,
		require : true
	},
	titre: {
		type : String,
		require : true
	},
	description: {
		type : String,
		require : true
	},
	category:{
		type : String,
		require : true
	},
	url: {
		type : String,
		require : true
	},		
	tags: {
		type : [String],
		require : true
	},
	creation: {
		type : Date,
		require : false,
		default: Date.now
	},
	visible: {
		type : Boolean,
		require : false,
		default: true
	},	
	views: {
		type : Number,
		require : false,
		default : 0
	},
	likes: {
		type : Number,
		require : false,
		default : 0
	},
	category: {
		type : String,
		require : false,
		default : 0
	},
	imageUrl: {
		type : String,
		require : false,
		default : 0
	}
});
// On declare le model User dans mongoose
module.exports = ArticleSchema; 