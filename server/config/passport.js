var User = require('../database/dbSchema').User;
var configAuth = require('./auth');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.find(id).complete(function(error, user) {
      if (error)
        done(error);

      done(null, user);
    });
  });

  passport.use(new GoogleStrategy({
      clientID        : configAuth.googleAuth.clientID,
      clientSecret    : configAuth.googleAuth.clientSecret,
      callbackURL     : configAuth.googleAuth.callbackURL
    },
    function(token, refreshToken, profile, done) {

      // make the code asynchronous
      // User.find won't fire until we have all our data back from Google
      process.nextTick(function() {

        // try to find the user based on their google id
        User.find({ where: { google_id : profile.id } }).complete(function(err, user) {
          if (err)
            return done(err);

          if (user) {
            // if a user is found, log them in
            return done(null, user);
          } else {
            // if the user isnt in our database, create a new user
            var newUser = User.build({
              google_id: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value
            });

            newUser.save().complete(function(err, newUser) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }));
};