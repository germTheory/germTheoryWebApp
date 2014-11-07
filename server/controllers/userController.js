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
    // TODO: remove hack
    var username = req.body.username;

    db.findUser(_username, function(results){
      if (results.length === 0) {
        console.log("User does not exist!");
        res.send(500, true);
      } else {
        // sign-up the user using google Auth
        // save location information
        res.status(200).send(results);
      }
    });
  },

  /*
  Signup if you want to use the app.
  */
  signup: function (req, res, next) {
    // TODO: remove hack
    var username  = req.body.username,

    // TO BE IMPLEMENTED WITH OAUTH

    // check to see if user exists
    db.findUser(username, function(results){
      console.log("signup: ", results);
      if (results.length === 0) {
        console.log("User does not exist, adding new user...");
        db.saveUser(_username, function(results){
          if (results) {
            console.log("User successfully added");
            res.status(200).send("Added User");
          }
        });
      } else {
        // sign-up the user using google Auth
        // save location information
        console.log("User already exists. Try signing in!");
        res.status(503).send(results);
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
    var id = req.params.userId;
    var username  = "test"; // TODO: get username from request

    db.findUserById(id, function(result){
      if (result.length > 0){
        console.log("Success finding user in database for: ", id);
        res.status(200).send(result);
      } else {
        console.log("Could not find user in database for : ", id);
        res.status(404).send("Could not find user in database");
      }
    });
    
  },

    /* Obtain the user's information from database,
  which is: id, name, gender,
  and diseases that the person has???*/
  getAllUsers: function(req, res, next){

    db.findAllUsers(function(result){
      if (result.length > 0){
        console.log("Success finding users in database ");
        res.status(200).send(result);
      } else {
        console.log("Could not find users in database");
        res.status(404).send("Could not find user in database");
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
