var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple');

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;
    // INSERT CODE TO SIGN USER IN
  },

  signup: function (req, res, next) {
    var username  = req.body.username,
        password  = req.body.password,
        create,
        newUser;
    // INSERT CODE TO ADD USER
    // check to see if user already exists
        // make a new user if does not exist
        // then...
            // create token to send back for auth
  },

  checkAuth: function (req, res, next) {
	// checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      // find user with that username.  If there is a user, send the page
    }
  }
};
