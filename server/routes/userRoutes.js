var userController = require('../controllers/userController.js');


module.exports = function (app) {
  // our app is the userRouter injected from serverConfig.js

  // Params
  app.param('userId', userController.getUserCode);

  // Basic user routes
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.get('/signedin', userController.checkAuth);
  app.get('/:userId/locations', userController.getUserLocations);
};