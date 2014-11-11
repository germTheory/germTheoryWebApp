var db = require('../database/dbSchema.js'),
    User = db.User,
    Q    = require('q'),
    jwt  = require('jwt-simple');

module.exports = {

  getUser: function(req, res, next){
    var id = req.params.id;

    User.find(req.params.id).then(function (user) {
      res.status(200).send(user);
    });

/*    db.findUserById(id, function(result){
      if (result.length > 0){
        console.log("Success finding user in database for: ", id);
        res.status(200).send(result);
      } else {
        console.log("Could not find user in database for : ", id);
        res.status(404).send("Could not find user in database");
      }
    });*/
  },

  getAllUsers: function(req, res, next){
    db.findAllUsers(function(result){
      if (result.length > 0){
        // console.log("Success finding users in database ");
        res.status(200).send(result);
      } else {
        console.log("Could not find users in database");
        res.status(404).send("Could not find user in database");
      }
    });
  },

  showAllUsers: function(req, res, next) {
    db.findAllUsers(function(err, users) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.render('users', { users: users });
      }
    });
  },

  showUserInfo: function(req, res, next) {
    User.find(req.params.id).then(function (user) {

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
