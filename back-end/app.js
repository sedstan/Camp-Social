var express     = require('express');
var cors        = require('cors');
var path        =require('path');
var morgan      =require('morgan');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var passport    = require('passport');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var jwt         = require('jsonwebtoken');
var app         = express();
var config      = require('./config/config');
var User        = require('./models/user');
var secret      = require('./config/config').secret;

mongoose.connect(config.database);

require('./config/passport')(passport);

app.use(methodOverride(function(req,res){
  if ()
}))

