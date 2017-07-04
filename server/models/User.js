// On importe mongoose comme il sera utiliser
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
	//exports  = module.exports = {};
var UserSchema = new mongoose.Schema({ 
	local: {
			name: {
				type : String,
				require : true
			},
			email: {
				type : String,
				require : true
			},
			password: {
				type : String,
				require : true
			}
	},
	google: {
			id: {
				type : String,
				require : true
			},
			token: {
				type : String,
				require : true
			},
			name: {
				type : String,
				require : true
			},
			email: {
				type : String,
				require : true
			}
	},
	twitter: {
			id: {
				type : String,
				require : true
			},
			token: {
				type : String,
				require : true
			},
			displayname: {
				type : String,
				require : true
			},
			username: {
				type : String,
				require : true
			}
	},
	facebook: {
			id: {
				type : String,
				require : true
			},
			token: {
				type : String,
				require : true
			},
			name: {
				type : String,
				require : true
			},
			email: {
				type : String,
				require : true
			}
	},
	linkedin: {
			id: {
				type : String,
				require : true
			},
			token: {
				type : String,
				require : true
			},
			name: {
				type : String,
				require : true
			},
			email: {
				type : String,
				require : true
			}
	}

});
// generating a hash
//UserSchema.methods.generateHash = function(password) {
 //   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//};

// checking if password is valid
//UserSchema.methods.validPassword = function(password) {
//    return bcrypt.compareSync(password, this.local.password);
//};

// On declare le model User dans mongoose
module.exports = mongoose.model('user', UserSchema);; 

