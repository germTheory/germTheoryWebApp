var userController = require('../controllers/userController.js');
var helpers = require('../config/helpers.js');
var locationController = require('../controllers/locationController.js');
var passport = require('passport');

module.exports = function (app) {

  app.get('/users', helpers.isLoggedIn, userController.showAllUsers);
  app.get('/users/:id', helpers.isLoggedIn, userController.showUserInfo);
  app.get('/locations', helpers.isLoggedIn, locationController.showAllLocations);
  app.get('/reports', helpers.isLoggedIn, function(req, res) {
    res.render('reports');
  });
  app.get('/submitReport', helpers.isLoggedIn, function(req, res) {
    res.render('submitReport');
  });

  app.get('/*', helpers.isLoggedIn, function(req, res, next) {
    res.render('index');
  });
};