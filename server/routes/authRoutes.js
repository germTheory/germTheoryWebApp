var authController = require('../controllers/authController.js');
var helpers = require('../lib/helpers.js');
var passport = require('passport');

module.exports = function (app) {
  app.get('/login', authController.loginForm);
  // app.post('/login', authController.login);
  // app.post('/signup', authController.signup);
  // app.get('/signup', authController.signupForm);

  app.get('/logout', authController.logout);
  
  app.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/google/callback', passport.authenticate('google', {
    successRedirect : '/users',
    failureRedirect : '/auth/login'
  }));
};