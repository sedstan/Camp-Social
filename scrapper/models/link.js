var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var linkSchema  =mongoose.Schema({
  href: { type: String, required: true, unique: true },
  title: String,
  // id: id
  

});

linkSchema.plugin(findOrCreate);

module.exports = mongoose.model("Link", linkSchema);
