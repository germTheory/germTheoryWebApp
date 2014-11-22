var jwt  = require('jwt-simple');


module.exports = {
  errorLogger: function(error, req, res, next) {
    console.error(error.stack);
    next(error);
  },

  errorHandler: function(error, req, res, next) {
    var errorCode = error.status ? error.status : 500;

    res.send(errorCode, {error: error.message});
  },

  // return a 405 if the API does not support the desired function
  invalidMethodHandler: function(req, res, next) {
    res.send(405, { message: "Method not allowed" });
  },


  isLoggedInApi: function(req, res,next){
    var token = req.headers['x-access-token'];
    var user;

    if (!token) {
      return res.send(401); // send unauthorized if a token is not provided
    }
    try {
      // decode token and attach user to the request
      // for use inside our controllers
      user = jwt.decode(token, 'fjkdlsajfoew239053/3uk');
      req.user = user;
      next();
    } catch(error) {
      error.status = 403;
      return next(error);
    }
  },
  isLoggedInWeb: function(req, res, next) {
    if (req.isAuthenticated()) {
      console.log('logged in');
      return next();
    } else {

    // if they aren't redirect them to the login page
    console.log('not logged in');
    res.redirect('/auth/login');
    }
  }
};
