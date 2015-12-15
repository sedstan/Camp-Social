var request  = require ("request");
var cheerio  = require ("cheerio");
var mongoose = require("mongoose");
var Campsite = require("./models/campsite");
var config   = require("./config/config");
var promise  = require("bluebird");
var geocoder = require('geocoder')

// Replace mongoose promises with bluebird promises
require('mongoose').Promise = promise;
// Replace all geocoders functions to be promises
promise.promisifyAll(geocoder)

mongoose.connect(config.database);

var limit    = "2000";
var base_url = "https://www.coolcamping.co.uk"
var path     = "/search?q=uk&limit=" + limit;
var url      = base_url + path;
var promises = [];

scrape(url);
function scrape(url){
  console.log("Preparing to scrape: " + url);

  request(url, function(error, response, body){
    if (error) return console.log(error);
    if (response.statusCode !== 200) return console.log("Uh oh.");
    if (response.statusCode === 200) {
      var $ = cheerio.load(body);

      $("li.site").each(function(){
        var link    = $(this).children("a");
        var text    = link.children("div.text");
        var name    = text.children("h4").text();
        var address = text.children("div.address").text();
        var image   = link.children("div.image").children("img").attr("src");
        var src     = link.attr("href").split("?").shift();
        var latitude;
        var longitude;
        var data;

        var deferred = geocoderPromise(address)
          .then(function(lat, lng){
            latitude  = lat;
            longitude = lng;
          }).catch(console.error)
          .then(function(){
            data = {
              name: name,
              address: address,
              latitude: latitude,
              longitude: longitude,
              image: base_url + image,
              url: base_url + src
            }

            console.log(data.name + " was found");

            // Mongoose queries are not promises
            var query   = Campsite.findOne({ name: data.name })
            // Convert to promise using mongoose's .exec()
            var promise = query.exec();
            promises.push(promise);

            promise
              .then(function(campsite) {
                if (campsite) {
                  var query   = Campsite.findByIdAndUpdate(campsite._id, data);
                  var promise = query.exec();
                  promise
                    .then(function(err, campsite) {
                      return console.log("'%s' was updated.", data.name);
                    })
                    .catch(function(err){
                      return console.log("There was an error updating " + data.name + ": " + err);
                    }); 
                } else {
                  Campsite
                    .create(data)
                    .then(function(campsite) {
                      return console.log("'%s' was created." , data.name);
                    })
                    .catch(function(err) {
                      return console.log("There was an error creating " + data.name + ": " +err);
                    })
                }
              })
              .catch(function(err) {
                return console.log("There was an error saving " + data.name + ": " + err);
              })
          })
        promises.push(deferred)
      }) // <!-- LOOP -->   
    }

    // Quit
    promise.all(promises)
      .then(function() { 
        return process.exit();
      })
  });
};

function geocoderPromise(address) {
  return new promise(function(resolve, reject) {
    geocoder.geocodeAsync(address)
    .then(function(data) {
      console.log(data)
      data = data.results[0]
      lat = data ? data.geometry.location.lat : data;
      lng = data ? data.geometry.location.lng : data;
      resolve(lat, lng);
    });
  })
  .catch(function(err) {
    console.log(err);
  });
};