var mongoose = require('mongoose');
var dayScheduleSchema = mongoose.Schema({
    week: Number,
	first: String,
    second : String,
    third : String,
	fourth : String,
	fifth : String,
	sixth : String,
	seventh : String,
	eighth : String,
	ninth : String
});

module.exports = mongoose.model('daySchedule', dayScheduleSchema);
