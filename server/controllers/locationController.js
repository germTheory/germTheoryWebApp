var db = require('../database/dbSchema'),
  Location = db.Location;

// insert other dependencies here

  module.exports = {
    allLocations: function(req, res, next){
      Location.findAll({limit:50}).then(function(data){
        res.status(200).send(data);
      });
    },
    getLocation: function(req,res,next){
      Location.find(req.params.id).then(function(found){
        res.status(200).send(found);
      });

    },
    newLocation: function(req, res, next){
      var reqLatitude = req.body.latitude,
      reqLongitude = req.body.longitude,
      userId = req.body.user_id;
      // save our location to the database
      Location.create({ user_id: userId, latitude: reqLatitude, longitude: reqLongitude })
      .then(function(model){
        res.sendStatus(201);
      },function(err){
        res.status(400).send(err);
      });
    },

  };
