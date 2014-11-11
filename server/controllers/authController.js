var db = require('../database/dbSchema.js'),
    User = db.User;

module.exports = {

  loginForm: function (req, res) {
    res.render('login');
  },

  signupForm: function (req, res) {
    res.render('signup');
  },

  // login: function (req, res, next) {
  //   var username = req.body.username;

  //   db.findUser(username, function(results){
  //     if (results.length === 0) {
  //       console.log("User does not exist!");
  //       res.send(500, true);
  //     } else {
  //       // sign-up the user using google Auth
  //       // save location information
  //       res.status(200).send(results);
  //     }
  //   });
  // },

  // signup: function (req, res, next) {
  //   var newUser = { name: req.body.name,
  //                   gender: req.body.gender};
  //   console.log("signup: ", req.body);
  //   // TO BE IMPLEMENTED WITH OAUTH

  //   // check to see if user exists
  //   db.findUser(newUser, function(results, user){
  //     if (results.length === 0) {
  //       console.log("User does not exist, adding new user...", user );

  //       db.saveUser(user, function(results){
  //         if (results) {
  //           console.log("User successfully added");
  //           res.status(200).send(results);
  //         }
  //       });
  //     } else {
  //       // sign-up the user using google Auth
  //       // save location information
  //       console.log("User already exists. Try signing in!");
  //       res.status(503).send(results);
  //     }
  //   });
    
  //   // TODO: create token to send back for auth

  // },

  logout: function(req, res, next) {
    // TODO: Add logout logic here
    res.redirect('/auth/login');
  }
};

