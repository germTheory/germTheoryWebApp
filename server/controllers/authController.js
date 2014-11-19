var User = require('../database/dbSchema.js').User;
var jwt = require('jwt-simple');
var jwtSecret = 'fjkdlsajfoew239053/3uk';

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

  logout: function(req, res, next) {
    req.logout();
    res.redirect('/');
  },

  signin: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.find({
      where: { email: username },
      attributes: ['id', 'name', 'gender', 'email', 'created_at', 'updated_at']
      })
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          // TODO: Currently, we do not hash password until we implement pre-save hook to generate a hashed password
/*          return user.comparePassword(password)
            .then(function(foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, jwtSecret);
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });*/
          var token = jwt.encode(user, jwtSecret);
          res.json({token: token, user: user});
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.find({ where: { email: username }})
      .then(function(user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not exist
          return User.create({
            email: username,
            password: password
          });
        }
      })
      .then(function(user) {
        // create token to send back for auth
        var token = jwt.encode(user, jwtSecret);
        var newUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
          updated_at: user.updated_at,
          gender: user.gender
        };
        res.json({token: token, user: newUser});
      })
      .fail(function (error) {
        next(error);
      });
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
      var user = jwt.decode(token, jwtSecret);
      User.find({ where: { username: user.username }})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};
