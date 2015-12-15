var express = require('express');
var router = express.Router();
var campsitesController = require('../controllers/campsitesController');

router.route("/campsites")
  .get(campsitesController.campsitesIndex)

module.exports = router;


