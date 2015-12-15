var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/user');

module.exports = function(passport) {
  passport.use('loca-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  }, function(req, email, password, done) {

    User.findOne({ 'local.email' : email }, function(err, user) { 
      if (err) return done(err, false, {message: "Something went wrong. Please try again." });
      if (user) return done(null, false, { message: "This email is already registered." });

      newUser.save(function(err, user) {
        if(err) return done(err, false, { message: "Sorry, this email is already in use. Please try again." });
        return done(null, user);
      });
    });
  }));
}