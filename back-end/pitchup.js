var request  = require ("request");
var cheerio  = require ("cheerio");
var mongoose = require("mongoose");
var Campsite = require("./models/campsite");
var config   = require("./config/config");
var Q        = require('q');
var geocoder = require('geocoder');

// Replace mongoose promises with Q promises
require('mongoose').Promise = require('q').Promise;

mongoose.connect(config.database);

var base_url = "https://www.pitchup.com/campsites"
var country  = "England"
var region   = "South_West"
var page     = 1;
var path     = "/" + country + "/" + region +"?page=" + 1;
var url      = base_url + path;
var promises = [];

scrape(url);
function scrape(url){  
  console.log("Preparing to scrape: " + url);

  return request(url, function(error, response, body){
    if (error) return console.log(error);
    if (response.statusCode !== 200) return console.log("Uh oh.");
    if (response.statusCode === 200) {
      var $ = cheerio.load(body);

      $(".searchResult").each(function(){
        // var url = $(this).children("table").children("tbody").children("tr").children("td.campsite-image-cell").children("div.ribbon-wrapper").children("a").attr("href")

        var image = $(this).children("table").children("tr").children(".campsite-image-cell").children(".ribbon-wrapper").children("a").children("img").attr("src");
        var name = $(this).children("table").children("tr").children(".campsite-image-cell").next().children(".campsite-name-block").children("a.campsite-name").text();
        var src = $(this).children("table").children("tr").children(".campsite-image-cell").next().children(".campsite-name-block").children("a.campsite-name").attr("href");
        var address = $(this).children("table").children("tr").children(".campsite-image-cell").children(".ribbon-wrapper").children("a").children("img").attr("data-os-src").match(/(?=&pp=)(.*?)(?=;)/)[0];
        var address = address ? address.replace("&pp=", "") : null;
        var latLng   = address.split(",");
        var latitude = latLng[0];
        var longitide = latLng[1];
        geocoder.reverseGeocode(latitude, longitide, function(err, data) {
          if (err) return false;
          console.log(name);
          console.log(data.results[0].formatted_address);
        });

        // var data = {
        //   name: name,
        //   address: address,
        //   latitude: latitude,
        //   longitude: longitide,
        //   image: image,
        //   url: base_url + src
        // }
        

        // console.log(data);
    //     console.log(data.name + " was found");

    //     // Mongoose queries are not promises
    //     var query   = Campsite.findOne({ name: data.name })
    //     // Convert to promise using mongoose's .exec()
    //     var promise = query.exec();
    //     promises.push(promise);

    //     promise
    //       .then(function(campsite) {
    //         if (campsite) {
    //           var query   = Campsite.findByIdAndUpdate(campsite._id, data);
    //           var promise = query.exec();
    //           promise
    //             .then(function(err, campsite) {
    //               return console.log("'%s' was updated.", data.name);
    //             })
    //             .catch(function(err){
    //               return console.log("There was an error updating " + data.name + ": " + err.errmsg);
    //             }); 
    //         } else {
    //           Campsite
    //             .create(data)
    //             .exec()
    //             .then(function(campsite) {
    //               return console.log("'%s' was created." , data.name);
    //             })
    //             .catch(function(err) {
    //               return console.log("There was an error creating " + data.name + ": " +err.errmsg);
    //             })
    //         }
    //       })
    //       .catch(function(err) {
    //         return console.log("There was an error saving " + data.name + ": " + err.errmsg);
    //       });
      }); // LOOP
    }

    // // Quit
    // Q
    //   .all(promises)
    //   .then(function() { 
    //     console.log('finished!');
    //     return process.exit(); 
    //   })
    //   .fail(function(){
    //     console.error()
    //     return process.exit();
    //   });  
  });
};