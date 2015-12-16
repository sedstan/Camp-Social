var Campsite = require('../models/campsite');

function campsitesIndex(req,res) {
  Campsite.find({}, function(err, campsites) {
    if (err) return res.status(404).send(err)
      res.status(200).send(campsites)
  });

}

function campsitesCreate(req,res) {
  var campsite = new Campsite(req.body.campsite);
  campsite.save(function(err) {
    if(err) return res.res.status(500).send(err);
    var id = req.body.campsite.user_id;
    User.findById(id, function(err, user) {
      user.campsites.push(campsite);
      user.save()
      return  res.status(201).send(campsite)
    });
  });
}

function campsitesShow(req, res) {
  var id = req.params.id;

  Campsite.findById({ _id: id }, function(err, campsites) {
    if(err) return res.status(500).send(err)
    if(!campsite) return res.status(404).send(err);

  res.status(200).send(campsite);

  })
}

module.exports = {
  campsitesIndex: campsitesIndex,
  campsitesCreate: campsitesCreate,
  campsitesShow: campsitesShow
}