var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var scheduleSchema = mongoose.Schema({
  _creator : {
     type: Schema.ObjectId,
     ref: 'User'
  },
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

module.exports = mongoose.model('Schedule', scheduleSchema);
