var locationController = require('./locationController');

module.exports = function (app) {
  // app === linkRouter injected from serverConfig.js
  // ALL ROUTES ARE PREPENDED WITH /api/location
  // currently unused route param
  app.param('userId', locationController.findUser);

  app.route('/')
    .get(locationController.allLocations)
    .post(locationController.newLocation);
}; 
