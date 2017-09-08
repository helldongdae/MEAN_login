var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var userSchema = mongoose.Schema({
    name: String,
    email : String,
    password : String,
	master: Boolean,
	schedule: [{
		day: String,
		first: String,
    	second : String,
    	third : String,
		fourth : String,
		fifth : String,
		sixth : String,
		seventh : String,
		eighth : String,
		ninth : String	
	}]
});	

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password, user) {
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', userSchema);
