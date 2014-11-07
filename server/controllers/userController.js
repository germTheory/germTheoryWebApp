// THIS FILE STORES ALL FUNCTIONS RELATED TO USER BEHAVIOR
var db = require('../database/dbSchema.js'),
    User = db.User;
    Q    = require('q'),
    jwt  = require('jwt-simple');

var userController = {

  /*
  Signin to the app if already a user.
  */
  signin: function (req, res, next) {
    var username = req.body.username;
    db.findUser(_username, function(results){
      if (results === 0) {
        console.log("User does not exist!");
        res.send(500, true);
      } else {
        // sign-up the user using google Auth
        // save location information
        res.send(200, true);
      }
    });
  },

  /*
  Signup if you want to use the app.
  */
  signup: function (req, res, next) {
    var username  = req.body.username,
        newUser;
    // TO BE IMPLEMENTED WITH OAUTH

    // check to see if user exists
    db.findUser(_username, function(err, results){
      if (results === 0) {
        console.log("User does not exist, adding new user...");
        db.saveUser(_username, function(results){
          if (results) {
            console.log("User successfully added");
            res.send(200, "Added User");
          }
        });
      } else {
        // sign-up the user using google Auth
        // save location information
        console.log("User already exists. Try signing in!");
        res.send(503, true);
      }
    });
    
    // TODO: create token to send back for auth

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

  /* Obtain the user's information from database,
  which is: id, name, gender,
  and diseases that the person has???*/
  getUserInfo: function(req, res, next){
    var username  = req.body.username;

    db.findUser(username, function(result){
      if (result.length > 0){
        console.log("Sucess finding user in database for: ", username);
        res.send(200, result);
      } else {
        console.log("Could not find user in database for : ", username);
        res.send(404, "Could not find user in database");
      }
    });
    
  },

  getUserCode: function (req, res, next, code){
  //   var username  = req.body.username;
  //   var findUser = Q.nbind(User.findUser, User);
    
  //   findUser({username: username})
  //     .then(function (user) {
  //       if (!user) {
  //         next(new Error('User does not exist'));
  //       } else {
  //               req.code = code;
  //               next();
  //       }
  //     })
  //     .fail(function (error) {
  //       next(error);
  //     });
  }

};

module.exports = userController;
