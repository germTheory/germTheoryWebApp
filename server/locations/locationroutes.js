var locationController = require('./locationcontroller');

module.exports = function (app) {
  // app === linkRouter injected from middleware.js

  app.param('userId', locationController.findUser);

  app.route('/')
    .get(locationController.allLocations)
    .post(locationController.newLocation);

  app.route('/user/:userId', locationController.getUserLocations);
}; 
