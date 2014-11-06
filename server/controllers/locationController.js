var db = require('../database/dbSchema'),
	Locations = db.Locations;

// insert other dependencies here

module.exports = {
	allLocations: function(req, res, next){
		Location.getLocations().then(function(data){
			res.send(200);
		});
	},

	newLocation: function(req, res, next){
		var reqLatitude = req.body.latitude,
			reqLongitude = req.body.longitude,
			userId = req.body.user_id;
		// save our location to the database
		new Location({ user_id: userId, latitude: latitude, longitude: longitude }).save()
			.then(function(model){
				console.log(model);
				res.send(201);
			});
	},

	findUser: function(req, res, next, code){
		// Do a check to see if user is in the database
		// could change this to add a full user to the req, but for now we'll store the code
		console.log("FINDING USER");
		req.code = code;
		next();
	},
}