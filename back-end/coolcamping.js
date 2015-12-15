var request  = require ("request");
var cheerio  = require ("cheerio");
var mongoose = require("mongoose");
var Campsite = require("./models/campsite");
var config   = require("./config/config");
var Q        = require('q');
var geocoder = require('geocoder')

// Replace mongoose promises with Q promises
require('mongoose').Promise = require('q').Promise;

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

        geocoder.geocode(address, function(err, data) {
          // console.log(data.results[0]);
          //  var data = {
          //    name: name,
          //    address: address,
          //    image: base_url + image,
          //    url: base_url + src
          //  }

          //  console.log(data.name + " was found");

          // // Mongoose queries are not promises
          // var query   = Campsite.findOne({ name: data.name })
          // // Convert to promise using mongoose's .exec()
          // var promise = query.exec();
          // promises.push(promise);

          //  promise
          //    .then(function(campsite) {
          //      if (campsite) {
          //        var query   = Campsite.findByIdAndUpdate(campsite._id, data);
          //        var promise = query.exec();
          //        promise
          //          .then(function(err, campsite) {
          //            return console.log("'%s' was updated.", data.name);
          //          })
          //          .catch(function(err){
          //            return console.log("There was an error updating " + data.name + ": " + err.errmsg);
          //          }); 
          //      } else {
          //        Campsite
          //          .create(data)
          //          .exec()
          //          .then(function(campsite) {
          //            return console.log("'%s' was created." , data.name);
          //          })
          //          .catch(function(err) {
          //            return console.log("There was an error creating " + data.name + ": " +err.errmsg);
          //          })
          //      }
          //    })
          //    .catch(function(err) {
          //      return console.log("There was an error saving " + data.name + ": " + err.errmsg);
          //    })
        })
      });
    }

    // Quit
    Q
      .all(promises)
      .then(function() { 
        console.log('finished!');
        return process.exit(); 
      })
      .fail(function(){
        console.error()
        return process.exit();
      });  
  });
};