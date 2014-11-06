// THIS FILE STORES ALL FUNCTIONS RELATED TO USER BEHAVIOR
var db = require('../database/dbSchema.js'),
    User = db.User;
    Q    = require('q'),
    jwt  = require('jwt-simple');

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;
      //TODO: Implement findUser functionality in userModel. However, this will be replaced with OAUTH
      // nbind promisifies the findUser function so we can apply .then()
      var findUser = Q.nbind(User.findUser, User);
        findUser({username: username})
          .then(function (user) {
            if (!user) {
              next(new Error('User does not exist'));
            } else {
              // TODO: Implement comparePasswords functionality
              return user.comparePasswords(password)
                .then(function(foundUser) {
                  if (foundUser) {
                    var token = jwt.encode(user, 'secret');
                    res.json({token: token});
                  } else {
                    return next(new Error('No user'));
                  }
                });
            }
          })
          .fail(function (error) {
            next(error);
          });

    res.send(200, true);
  },

  signup: function (req, res, next) {
    var username  = req.body.username,
        password  = req.body.password,
        create,
        newUser;
    // TODO: INSERT CODE TO ADD USER, TO BE IMPLEMENTED WITH OAUTH
    // check to see if user already exists
    
      // make a new user if does not exist
      // then...
          // create token to send back for auth
        res.send(200, true);
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
    res.send(200, true);
  },

  getUserCode: function (req, res, next, code){
    var findUser = Q.nbind(User.findUser, User);
      
      findUser({username: username})
        .then(function (user) {
          if (!user) {
            next(new Error('User does not exist'));
          } else {
	           req.code = code;
	           next();
          }
        })
        .fail(function (error) {
          next(error);
        });
  },

  getUserLocations: function(req, res, next){
    var uid = code;
    var getLoc = Q.nbind(User.fetchUserLocations, User);
    getLoc({id: uid})
      .then(function(locations){
        if(!locations){
          next(new Error('No locations found for given userId'));
        } else {
          return locations;
        }
      })
      .fail(function(error){
        next(error);
      });
  }
};
