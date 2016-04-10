var mongoose = require('mongoose');
var passport   = require('bcrypt-nodejs');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  local: {
    // username: { type: String },
    name: { type: String },
    image: { type: String },
    bio:   { type: String},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  }
});

userSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model("User", userSchema);
