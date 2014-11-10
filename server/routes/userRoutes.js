var userController = require('../controllers/userController.js');

module.exports = function (app) {
  // app.param('userId', userController.getUserCode);

  app.get('/:id', userController.getUser);
  app.get('/', userController.getAllUsers);
};
