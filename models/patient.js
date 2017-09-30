var mongoose = require('mongoose');
var patientSchema = mongoose.Schema({
    name: String,
    ndt: Boolean,
	gait: Boolean,
	mat: Boolean,
	heat: Boolean,
	water: Boolean,
	hand: Boolean,
	sca: Boolean
});	

module.exports = mongoose.model('Patient', patientSchema);
