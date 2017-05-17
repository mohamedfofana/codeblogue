// On importe mongoose comme il sera utiliser
var mongoose = require('mongoose');
	//exports  = module.exports = {};
var UserSchema = new mongoose.Schema({ 
	name: {
		type : String,
		require : true
	},
	group: {
		type : String,
		require : true
	},
	urlPresentation: {
		type : String,
		require : true
	},
	connections: {
		type : Number,
		require : true
	} 
});
// On declare le model User dans mongoose
module.exports = UserSchema; 

