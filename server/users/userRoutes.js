var userController = require('./userController.js');


module.exports = function (app) {
  // our app is the userRouter injected from middleware.js
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.get('/signedin', userController.checkAuth);
};
