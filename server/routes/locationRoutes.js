var locationController = require('../controllers/locationController');

module.exports = function (app) {
  // app === linkRouter injected from serverConfig.js
  // ALL ROUTES ARE PREPENDED WITH /api/location
  // currently unused route param
  app.route('/')
    .get(locationController.findAll)
    .post(locationController.create);
  app.route('/:id')
    .get(locationController.find);
};
