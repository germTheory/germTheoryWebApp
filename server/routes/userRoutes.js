var userController = require('../controllers/userController');
var authController = require('../controllers/authController.js');
var helpers = require('../lib/helpers');

module.exports = function (app) {
  app.get('/', userController.getAllUsers);
  app.get('/:id', userController.getUser);
  app.post('/', helpers.invalidMethodHandler);
  app.put('/:id', helpers.invalidMethodHandler);
  app.delete('/:id', helpers.invalidMethodHandler);

  app.post('/login', authController.signin);
  app.post('/signup', authController.signup);
};
