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

  signin: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({where: {username: username}})
      .success(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
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
      .error(function (error) {
        next(error);
      });
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
