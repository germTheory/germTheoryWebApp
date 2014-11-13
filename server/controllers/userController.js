var db = require('../database/dbSchema.js');
var User = db.User;
var Proximity = db.Proximity;
var Location = db.Location;

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
    User.findAll({ include: [ Proximity ], limit: 50 })
      .success(function(results) {
        res.set('Content-Type', 'text/html');
        res.render('users', { results: results }); 
      });
  },

  showUserInfo: function(req, res, next) {
    // TODO: need to show user and proxmity info

    User.find({ where: { id: req.params.id}, include: [ Proximity, Location ], limit: 50 })
      .success(function(user) {
        console.log(user);
        console.log(user.dataValues.proximities);
        res.set('Content-Type', 'text/html');
        res.render('profile', { user: user }); 
      });
  }
};
