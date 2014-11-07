var userController = require('../controllers/userController.js');


module.exports = function (app) {
  // our app is the userRouter injected from serverConfig.js

  // Params
  // app.param('userId', userController.getUserCode);

  // Basic user routes
  app.route('/')
  	.get(userController.getAllUsers)

  app.route('/:userId')
  	.get(userController.getUserInfo);

  app.route('/signin')
  	.post(userController.signin);

  app.route('/signup')
  	.post(userController.signup)

  app.route('/signedup')
  	.get(userController.checkAuth);

};