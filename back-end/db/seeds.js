var mongoose = require('mongoose');
var databaseURL = 'mongodb://localhost:27017/campers';

mongoose.connect(databaseURL);

var User = require('../models/user');

var user1 = new User({
  username: "theProfessor",
  name: "Ben Layer"
  image: "http://fillmurray.com/g/200/300",
  email: "ben@ben.com",
  password: "password"

})


