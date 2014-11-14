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
    var reqLatitude = req.body.latitude;
    var reqLongitude = req.body.longitude;
    var userId = req.body.user_id;
    var date = req.body.date;

    Location.create({ user_id: userId, latitude: reqLatitude, longitude: reqLongitude, date: date })
      .then(function(location) {
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(location.dataValues);
      }, function(err) {
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
