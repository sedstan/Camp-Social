var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/user');

module.exports = function(passport) {
  passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  }, function(req, email, password, done) {

    User.findOne({ 'local.email' : email }, function(err, user) { 
      if (err) return done(err, false, {message: "Something went wrong. Please try again." });
      if (user) return done(null, false, { message: "This email is already registered." });

      var newUser = new User();
      newUser.local.name = req.body.name;
      newUser.local.image= req.body.image;
      newUser.local.email = email;
      newUser.local.password = newUser.encrypt(password);
      console.log(newUser);
      newUser.save(function(err, user) {
        if(err) return done(err, false, { message: "Sorry, this email is already in use. Please try again." });
        return done(null, user);
      });
    });
  }));
}