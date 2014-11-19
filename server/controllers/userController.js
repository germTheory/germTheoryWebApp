var db = require('../database/dbSchema.js');
var User = db.User;
var Proximity = db.Proximity;
var Location = db.Location;
var jwt = require('jwt-simple');

module.exports = {

  getUser: function(req, res, next){
    User.find({
      where: { id: req.params.id },
      attributes: ['id', 'name', 'gender', 'email', 'created_at', 'updated_at'] })
      .then(function (user) {
        res.set('Content-Type', 'application/json');
        res.status(200).send(user);
      });
  },

  getAllUsers: function(req, res, next){
    User.findAll({ attributes: ['id', 'name', 'gender', 'email', 'created_at', 'updated_at'] })
      .success(function(data) {
        res.set('Content-Type', 'application/json');
        res.status(200).send(data);
      })
      .error(function(err) {
        res.status(404).send(err);
      });
  },

  showAllUsers: function(req, res, next) {
    //User.findAll({ include: [ Proximity ], where: { is_admin: false }, limit: 50, order: 'name' })
    User.findAll({ include: [ Proximity ], order: 'id DESC' })
      .success(function(results) {
        res.set('Content-Type', 'text/html');
        res.render('users', { results: results }); 
      });
  },

  showUserInfo: function(req, res, next) {
    User.find({ where: { id: req.params.id }, include: [ Proximity, Location ], limit: 150 })
      .success(function(user) {
        res.set('Content-Type', 'text/html');
        res.render('profile', { user: user });
      });
  },

  signin: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.find({ where: { email: username }})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
/*          return user.comparePasswords(password)
            .then(function(foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });*/
          // TODO: We do not compare password for now
          var token = jwt.encode(user, 'secret');
          res.json({token: token});
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
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
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
      var user = jwt.decode(token, 'secret');
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
