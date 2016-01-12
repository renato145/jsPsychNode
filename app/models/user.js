
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{

	local			 : {
		username	 : String,
		password	 : String,
		email 		 : String,
		firstName	 : String,
		lastName	 : String
	},
	google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});