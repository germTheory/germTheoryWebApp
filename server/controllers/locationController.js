var Location = require('../database/dbSchema').Location;

module.exports = {

  findAll: function(req, res, next) {
    Location.findAll({limit: 100}).then(function (data) {
      res.status(200).send(data);
    });
  },

  find: function(req, res, next) {
    Location.find(req.params.id).then(function (found) {
      res.status(200).send(found);
    });
  },

  create: function(req, res, next) {
    var reqLatitude = req.body.latitude,
        reqLongitude = req.body.longitude,
        userId = req.body.user_id;

    Location.create({user_id: userId, latitude: reqLatitude, longitude: reqLongitude})
      .then(function (model) {
        res.sendStatus(201);
      }, function (err) {
        res.status(400).send(err);
      });
  },

  showAllLocations: function(req, res, next) {
    Location.findAll({ order: 'created_at DESC', limit: 100}).
      success(function (locations) {
        res.render('locations', { locations: locations });
      });
  }
};