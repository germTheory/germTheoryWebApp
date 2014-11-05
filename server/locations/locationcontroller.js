var Location = require('./locationmodel.js');
// insert other dependencies here

module.exports = {
	allLocations: function(req, res, next){
		Location.getLocations().then(function(data){
			res.send(200, true);
		});
	},

	newLocation: function(req, res, next){
		// TODO: WRITE CODE TO POST A LOCATION TO THE DATABASE
		res.send(200, true);
	},

	findUser: function(req, res, next, code){
		// Do a check to see if user is in the database
		// could change this to add a full user to the req, but for now we'll store the code
		console.log("FINDING USER");
		req.code = code;
		next();
	},
}