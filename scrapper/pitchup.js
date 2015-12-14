var request  = require ("request");
var cheerio  = require ("cheerio");
var mongoose = require("mongoose");
var Link     = require("./models/link");
var config   = require("./config/config");

mongoose.connect(config.database);

var base_url = "https://www.pitchup.com/campsites"
var country  = "England"
var region   = "South_West"
var path     = "/" + country + "/" + region;
// ?page=2
var url      = base_url + path;

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

        var url = $(this).children("table").children("tr").children(".campsite-image-cell").children(".ribbon-wrapper").children("a").children("img").attr("src");
        var name = $(this).children("table").children("tr").children(".campsite-image-cell").html();
        console.log(name);
      })

      // $("li.site").each(function(){
      //   // var link    = $(this).children("a");
      //   // var text    = link.children("div.text");
      //   // var name    = text.children("h4").text();
      //   // var address = text.children("div.address").text();
      //   // var image   = link.children("div.image").children("img").attr("src");
      //   // var src     = link.attr("href").split("?").shift();

      //   // Try to keep the same
        // var data = {
        //   name: name,
        //   address: address,
        //   image: base_url + image,
        //   url: base_url + src
        // }

      //   return console.log(data);
      // });
    }

    // Quit
    return process.exit();
  })
}


// $('td').each(function() {
//   var href = $(this).children("a").children("a.smallest").attr("href").match(/(?:revid=)(.*?)(?=/)
// So we want to return body response
// then we want to sort through the table and return the children hrefs for the individual show pages for each park.
// then we want to loop thru for each reagion and county

// var region  = "South+East"
// var county  = "London"
// var url     = "http://www.ukcampsite.co.uk/sites/results.asp?region= " + region + "&county=" + county;