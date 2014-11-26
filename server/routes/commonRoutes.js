var userController = require('../controllers/userController.js');
var helpers = require('../lib/helpers.js');
var db = require('../database/dbSchema.js');
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

  // Add Infected
  // check if user is in database
  // if in database, add that user to user_diseases table
  // else, add user to user table, locations table and user_diseases table
  
  // DISEASE INFORMATION
  app.post('/addinfected', helpers.isLoggedInWeb, function(req, res, next){
    userController.getUserByName(req, res, function(user){
      if (user) {
        db.Disease.findAll().then(function(diseases){
          res.render('confirminfected', {user: user, diseases: diseases});
        })
      } else {
        res.render('createnewinfected');
      }
    })
  });
  app.post('/confirminfected', helpers.isLoggedInWeb, function(req, res, next){
    var infarr = req.body.date_of_infection.split('/');
    var symparr = req.body.date_of_symptoms.split('/');
    var date_of_infection = new Date(infarr[2], infarr[0] - 1, infarr[1]);
    var date_of_symptoms = new Date(symparr[2], symparr[0] - 1, symparr[1]);
    
    var disease_id = req.body.disease_id;
    var user_id = req.body.user_id;

    db.UserDisease.create({
      est_date_of_infection:date_of_infection, 
      day_of_first_symptoms:date_of_symptoms,
      user_id:user_id,
      disease_id:disease_id
    })
    .then(function(val){
      console.log("Successfully inserted infected user to UserDisease table");
      res.status(201);
      res.render('successfuladdinfected');
    },
    function(err){
      console.log("Unable to insert infected user data to UserDisease table");
      res.redirect('/addinfected');
    });

  });
  app.get('/addinfected', helpers.isLoggedInWeb, function( req, res ){
    res.render('addinfected');
  })
  app.get('/diseases', helpers.isLoggedInWeb, diseaseController.getDiseasesPage);
  app.get('/newReportedCase', helpers.isLoggedInWeb, caseController.newReportedCase );
  app.get('/newRiskReport', helpers.isLoggedInWeb, reportController.newRiskReport );
  app.get('/*', helpers.isLoggedInWeb, function(req, res, next) {
    res.render('home');
  });
};
