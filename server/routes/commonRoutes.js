var userController = require('../controllers/userController.js');
var locationController = require('../controllers/locationController.js');

module.exports = function (app) {
  app.get('/login', userController.loginForm);
  app.post('/login', userController.login);
  app.get('/signup', userController.signupForm);
  app.post('/signup', userController.signup);
  app.get('/signedup', userController.checkAuth);
  app.get('/logout', userController.logout);

  app.get('/users', userController.showAllUsers);
  app.get('/users/:id', userController.showUserInfo);
  app.get('/locations', locationController.showAllLocations);
  app.get('/reports', function(req, res) {
    res.render('reports');
  });

  app.get('/*', function(req, res, next) {
    res.render('index');
  });
};
