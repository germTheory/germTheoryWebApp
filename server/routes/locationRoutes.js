var locationController = require('../controllers/locationController');
var helpers = require('../lib/helpers');
module.exports = function (app) {
  app.route('/')
    .all(helpers.isLoggedInApi)
    .get(locationController.getAllLocations)
    .post(locationController.createLocation);
  app.route('/:id')
    .all(helpers.isLoggedInApi)
    .get(locationController.getLocation);

  app.route('/users/:id')
    .all(helpers.isLoggedInApi)
  	.get(locationController.sendUserLocations);
};
