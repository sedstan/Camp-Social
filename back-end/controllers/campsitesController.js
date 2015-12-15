var Campsite = require('../models/campsite');

function campsitesIndex(req,res) {
  Campsite.find({}, function(err, campsites) {
    if (err) return res.status(404).send(err)
      res.status(200).send(campsites)
  })

}

module.exports = {
  campsitesIndex: campsitesIndex
}