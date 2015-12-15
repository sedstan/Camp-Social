var passport  = require('passport');
var User      = require('../models/user');
var secret    = require('../config/config').secret
var jwt       = require('jsonwebtoken');

