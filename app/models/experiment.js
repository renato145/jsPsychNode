
var mongoose = require('mongoose');

module.exports = mongoose.model('ExperimentData',{

	subjectId		 : String,
	subjectName		 : String,
	subjectEmail	 : String,
	experiment		 : String,
	date			 : String,
	data 			 : []

});
