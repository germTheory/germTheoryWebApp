var locationController = require('../controllers/locationController');
var helpers = require('../lib/helpers');
module.exports = function (app) {
  app.route('/')
    .get(locationController.getAllLocations)
    .post(locationController.createLocation);
  app.route('/:id')
    .get(locationController.getLocation);

  app.route('/users/:id')
  	.get(locationController.sendUserLocations);
};
