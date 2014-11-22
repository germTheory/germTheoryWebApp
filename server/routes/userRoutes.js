var userController = require('../controllers/userController');
var authController = require('../controllers/authController.js');
var helpers = require('../lib/helpers');

module.exports = function (app) {
  app.get('/', userController.getAllUsers);// TODO: Remove this when mobile is updated to use new endpoint
  app.get('/me',helpers.isLoggedInApi,authController.getUserInfo);
  app.get('/:id', userController.getUser);// TODO: Remove this  ''
  app.post('/', helpers.invalidMethodHandler);
  app.put('/:id', userController.editUser);
  app.delete('/:id', helpers.invalidMethodHandler);

  app.post('/login', authController.signin);
  app.post('/signup', authController.signup);
};
