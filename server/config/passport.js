var User = require('../database/dbSchema').User;
var configAuth = require('./auth');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy   = require('passport-local').Strategy;

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

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'local.email': email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
          return done(err);

        // if no user is found, return the message
        if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user);
      });
    }));

  passport.use(new GoogleStrategy({
      clientID        : configAuth.googleAuth.clientID,
      clientSecret    : configAuth.googleAuth.clientSecret,
      callbackURL     : configAuth.googleAuth.callbackURL
    },
    function(token, refreshToken, profile, done) {

      // User.find won't fire until we have all our data back from Google
      process.nextTick(function() {

        User.find({ where: { google_id : profile.id } }).complete(function(err, user) {
          if (err)
            return done(err);

          if (user) {
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

              console.log(newUser.id + ' has been created');
              return done(null, newUser);
            });
          }
        });
      });
    }));
};
