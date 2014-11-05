var Location = require('./locationmodel.js');
// insert other dependencies here

module.exports = {
	allLocations: function(req, res, next){
		res.send(200, true);
	},

	newLocation: function(req, res, next){
		res.send(200, true);
	},

	findUser: function(req, res, next, code){
		// Do a check to see if user is in the database
		// could change this to add a full user to the req, but for now we'll store the code
		req.code = code;
		next();
	},

	getUserLocations: function(req, res, next){

	},
}