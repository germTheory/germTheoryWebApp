var userController = require('../controllers/userController.js');

module.exports = function (app) {
  // app.param('userId', userController.getUserCode);

  app.get('/:userId', userController.getUserInfo);
  app.get('/', userController.getAllUsers);
};
