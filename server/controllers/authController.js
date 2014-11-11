var db = require('../database/dbSchema.js'),
    User = db.User,
    Q    = require('q'),
    jwt  = require('jwt-simple');

module.exports = {

  loginForm: function (req, res) {
    res.render('login');
  },

  test: function() {
    console.log('connected correctly');
    alert('hello');
  },

  signupForm: function (req, res) {
    res.render('signup');
  },

  login: function (req, res, next) {
    var username = req.body.username;

    db.findUser(username, function(results){
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

  signup: function (req, res, next) {
    var newUser = { name: req.body.name,
                    gender: req.body.gender};
    console.log("signup: ", req.body);
    // TO BE IMPLEMENTED WITH OAUTH

    // check to see if user exists
    db.findUser(newUser, function(results, user){
      if (results.length === 0) {
        console.log("User does not exist, adding new user...", user );

        db.saveUser(user, function(results){
          if (results) {
            console.log("User successfully added");
            res.status(200).send(results);
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

  logout: function(req, res, next) {
    // TODO: Add logout logic here
    res.redirect('/auth/login');
  }
};

