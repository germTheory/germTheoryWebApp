var userController = require('../controllers/userController.js');
var helpers = require('../lib/helpers.js');
var authController = require('../controllers/authController.js');
var locationController = require('../controllers/locationController.js');
var caseController = require('../controllers/caseController.js');
var passport = require('passport');

module.exports = function (app) {
  // Mobile auth routes
  app.get('/mobile', helpers.isLoggedIn, authController.showMobile);

  // Web auth routes
  app.get('/users', helpers.isLoggedIn, userController.showAllUsers);
  app.get('/users/:id', helpers.isLoggedIn, userController.showUserInfo);
  app.get('/locations', helpers.isLoggedIn, locationController.showAllLocations);
  app.get('/cases', helpers.isLoggedIn, caseController.showAllReportedCase);
  app.get('/reports', helpers.isLoggedIn, function(req, res) {
    res.render('reports');
  });
  app.get('/newReportedCase', helpers.isLoggedIn, function(req, res) {
    res.render('newReportedCase');
  });
  app.get('/*', helpers.isLoggedIn, function(req, res, next) {
    res.render('index');
  });
};
