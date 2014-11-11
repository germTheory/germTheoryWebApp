var userController = require('../controllers/userController.js');
var authController = require('../controllers/authController.js');
var locationController = require('../controllers/locationController.js');
var passport = require('passport');

module.exports = function (app) {

  app.get('/users', userController.showAllUsers);
  app.get('/users/:id', userController.showUserInfo);
  app.get('/locations', locationController.showAllLocations);
  app.get('/reports', function(req, res) {
    res.render('reports');
  });
  app.get('/submitReport', function(req, res) {
    res.render('submitReport');
  });

  app.get('/*', function(req, res, next) {
    res.render('index');
  });
};