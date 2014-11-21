var userController = require('../controllers/userController.js');
var helpers = require('../lib/helpers.js');
var authController = require('../controllers/authController.js');
var locationController = require('../controllers/locationController.js');
var caseController = require('../controllers/caseController.js');
var processingController = require('../controllers/processingController.js');
var reportController = require('../controllers/reportController.js');
var diseaseController = require('../controllers/diseaseController.js');
var passport = require('passport');

module.exports = function (app) {
  // Mobile auth routes
  app.get('/mobile', helpers.isLoggedInWeb, authController.showMobile);
  app.get('/', helpers.isLoggedInWeb, function(req, res){
    res.render('home');
  });
  // Web auth routes
  app.get('/users', helpers.isLoggedInWeb, userController.showAllUsers);
  app.get('/users/:id', helpers.isLoggedInWeb, userController.showUserInfo);
  
  app.get('/locations', helpers.isLoggedInWeb, locationController.showAllLocations);
  app.get('/cases', helpers.isLoggedInWeb, caseController.showAllReportedCase);
  
  // REPORTS
  app.get('/reports', helpers.isLoggedInWeb, reportController.showAllProximityReports);
  app.post('/reports', helpers.isLoggedInWeb, processingController.createReport);
  
  // DISEASE INFORMATION
  app.get('/diseases', helpers.isLoggedInWeb, diseaseController.getDiseasesPage);
  app.get('/newReportedCase', helpers.isLoggedInWeb, caseController.newReportedCase );
  app.get('/newRiskReport', helpers.isLoggedInWeb, reportController.newRiskReport );
  app.get('/*', helpers.isLoggedInWeb, function(req, res, next) {
    res.render('index');
  });
};
