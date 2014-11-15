var db = require('../database/dbSchema.js');
var User = db.User;
var Proximity = db.Proximity;
var Location = db.Location;

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
    User.findAll({ include: [ Proximity ], where: { is_admin: false }, limit: 50, order: 'name' })
      .success(function(results) {
        res.set('Content-Type', 'text/html');
        res.render('users', { results: results }); 
      });
  },

  showUserInfo: function(req, res, next) {
    // TODO: need to show user and proxmity info

    User.find({ where: { id: req.params.id }, include: [ Proximity, Location ], limit: 50 })
      .success(function(user) {
        console.log(user);
        console.log(user.dataValues.proximities);
        res.set('Content-Type', 'text/html');
        res.render('profile', { user: user }); 
      });
  }
};
