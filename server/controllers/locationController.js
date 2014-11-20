var Location = require('../database/dbSchema').Location;

module.exports = {

  getAllLocations: function(req, res, next) {
    Location.findAll({ limit: 100 }).then(function(data) {
      res.status(200).send(data);
    });
  },

  getLocation: function(req, res, next) {
    Location.find(req.params.id).then(function(found) {
      res.status(200).send(found);
    });
  },

  createLocation: function(req, res, next) {
    var reqLatitude = req.body.location.latitude;
    var reqLongitude = req.body.location.longitude;
    var reqSpeed = req.body.location.speed;  // Can be included for better proximity estimation
    var date = req.body.location.recorded_at;
    var userId = req.body.user_id;

    Location.create({ user_id: userId, latitude: reqLatitude, longitude: reqLongitude, date: date })
      .then(function(location) {
        console.log("Inserted into locations table: ", userId, reqLatitude, reqLongitude, date);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(location.dataValues);
      }, function(err) {
        console.log("Unable to write to locations table, ", err);
        res.status(400).send({ error: err.name, message: err.message });
      });
  },

  showAllLocations: function(req, res, next) {
    Location.findAll({ order: 'created_at DESC', limit: 100 }).
      success(function(locations) {
        res.render('locations', { locations: locations });
      });
  }
};
