var locationController = require('../controllers/locationController');

module.exports = function (app) {
  app.route('/')
    .get(locationController.getAllLocations)
    .post(locationController.createLocation);
  app.route('/:id')
    .get(locationController.getLocation);

  app.route('/users/:id')
  	.get(locationController.sendUserLocations);
};
