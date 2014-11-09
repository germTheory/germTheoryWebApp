var userController = require('../controllers/userController.js');

module.exports = function (app) {
  app.get('/login', userController.loginForm);
  app.post('/login', userController.login);
  app.get('/signup', userController.signupForm);
  app.post('/signup', userController.signup);
  app.get('/signedup', userController.checkAuth);

  app.get('/users', userController.showUsers);

  app.get('/*', function(req, res, next) {
    res.render('index');
  });
};
