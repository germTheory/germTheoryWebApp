var locationController = require('../controllers/locationController');

module.exports = function (app) {
  app.route('/')
    .get(locationController.findAllLocations)
    .post(locationController.createLocation);
  app.route('/:id')
    .get(locationController.findLocation);
};
