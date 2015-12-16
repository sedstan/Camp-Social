var express = require('express');
var router = express.Router();
var campsitesController = require('../controllers/campsitesController');

router.route("/campsites")
  .get(campsitesController.campsitesIndex)
  .post(campsitesController.campsitesCreate)

router.route("/campsites/:id")
  .get(campsitesController.campsitesShow)
  // .patch(campsitesController.cam)

module.exports = router;


