var request  = require ("request");
var cheerio  = require ("cheerio");
var mongoose = require("mongoose");
var Link     = require("./models/link");
var config   = require("./config/config");

mongoose.connect(config.database);

var limit    = "2000";
var base_url = "https://www.coolcamping.co.uk"
var path     = "/search?q=uk&limit=" + limit;
var url      = base_url + path;

scrape(url);
function scrape(url){  
  console.log("Preparing to scrape: " + url);

  return request(url, function(error, response, body){
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

        var data = {
          name: name,
          address: address,
          image: base_url + image,
          url: base_url + src
        }

        return console.log(data);
      });
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