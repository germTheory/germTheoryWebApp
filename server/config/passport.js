var User = require('./dbConfig').User;
var configAuth = require('./auth');

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.find(req.params.id).then(function (user) {
      done(null, user);
    }).error(function(error) {
      done(error);
    });
  });
};