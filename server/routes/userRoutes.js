var userController = require('../controllers/userController');
var helpers = require('../lib/helpers');

module.exports = function (app) {
  app.get('/', userController.getAllUsers);
  app.get('/:id', userController.getUser);
  app.post('/', helpers.invalidMethodHandler);
  app.put('/:id', helpers.invalidMethodHandler);
  app.delete('/:id', helpers.invalidMethodHandler);
};
