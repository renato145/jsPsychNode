
var mongoose = require('mongoose');

var Subjects = new mongoose.Schema({
	subjectId	 : String,
	name		 : String,
	email		 : String,
	experiment 	 : [{
		date	 : String,
		data	 : []
	}]
});
module.exports = mongoose.model('ExperimentData',{
	name			 : String,
	subject 		 : [Subjects]
});
