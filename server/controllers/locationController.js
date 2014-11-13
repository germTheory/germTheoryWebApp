var Location = require('../database/dbSchema').Location;

module.exports = {

  findAllLocations: function(req, res, next) {
    Location.findAll({ limit: 100 }).then(function(data) {
      res.status(200).send(data);
    });
  },

  findLocation: function(req, res, next) {
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
      .then(function(model) {
        res.sendStatus(201);
      }, function(err) {
        res.status(400).send(err);
      });
  },

  showAllLocations: function(req, res, next) {
    Location.findAll({ order: 'created_at DESC', limit: 100 }).
      success(function(locations) {
        res.render('locations', { locations: locations });
      });
  }
};
