var mongoose = require('mongoose');
var InameSchema = new mongoose.Schema({ 	
	label: {
		type : String,
		require : true
	},
	gender:{
		type : String,
		require : true
	},
	meaning: {
		type : String,
		require : true
	}
});
module.exports = InameSchema; 