var db = require('../database/dbSchema.js'),
    User = db.User;

module.exports = {

  getUser: function(req, res, next){
    User.find(req.params.id).then(function (user) {
      res.set('Content-Type', 'application/json');
      res.status(200).send(user);
    });
  },

  getAllUsers: function(req, res, next){
    User.findAll()
      .success(function(data) {
        res.set('Content-Type', 'application/json');
        res.status(200).send(data);
      })
      .error(function(err) {
        res.status(404).send(err);
      });
  },

  showAllUsers: function(req, res, next) {
    User.findAll({ limit: 50 })
      .success(function(users) {
        res.set('Content-Type', 'text/html');
        res.render('users', { users: users });
      });
  },

  showUserInfo: function(req, res, next) {
    // TODO: need to show user and proxmity info
  }
};
