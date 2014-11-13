var db = require('../database/dbSchema.js');
var User = db.User;

module.exports = {

  loginForm: function (req, res) {
    res.render('login');
  },

  signupForm: function (req, res) {
    res.render('signup');
  },

  usersRender: function (req, res) {
    res.render('users');
  },

  showMobile: function (req, res) {
    res.render('mobile');
  },

  login: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    User.find({where: {email: email, password: password}}).success(function (user) {
      console.log('found user');
    });

    // User.find(email, function(err, user) {
    //   if (err) {
    //     console.log('could not find user');
    //   }
    //   if (!user) {
    //     return done(null, false, req.flash('yo'));
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, req.flash('bo'));
    //   }
    //   console.log('found him yo');
    //   return done(null, user);
    // });
  },

  signup: function (req, res, next) {
    console.log('got into signup');
    var newUser = { name: req.body.name,
                    password: req.body.password,
                    email: req.body.email
                  };
    console.log("signup: ", req.body);
    // TO BE IMPLEMENTED WITH OAUTH

    // check to see if user exists
    db.findUser(newUser, function(results, user){
      if (results.length === 0) {
        console.log("User does not exist, adding new user...", user );

        db.saveUser(newUser, function(results){
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

  logout: function(req, res, next) {
    req.logout();
    res.redirect('/');
  }
};
