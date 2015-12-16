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

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === "object" && "_method" in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method; 
  }
}));

var routes = require('./config/routes');
app.use("/api",routes);

app.listen(process.env.PORT || 3000);
console.log("Express delivery!")