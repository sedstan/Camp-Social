var express = require('express');
var router = express.Router();
var campsitesController = require('../controllers/campsitesController');
var usersController = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);
router.route('/')
  .get(usersController.usersIndex)

router.route('/users')
  .get(usersController.usersIndex)
  //.post(usersController.usersCreate)


router.route("/campsites")
  .get(campsitesController.campsitesIndex)
  .post(campsitesController.campsitesCreate)

router.route("/campsites/:id")
  .get(campsitesController.campsitesShow)
   .patch(campsitesController.campsitesUpdate)

module.exports = router;


