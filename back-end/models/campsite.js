var mongoose = require("mongoose");

var campsiteSchema = mongoose.Schema({
  name: String,
  address: String,
  latitude: Number,
  longitude: Number,
  image: String,
  url: String
});

module.exports = mongoose.model("Campsite", campsiteSchema);