var request  = require ("request");
var cheerio  = require ("cheerio");
var mongoose = require("mongoose");
var Link     = require("./models/link");
var config   = require("./config/config");

mongoose.connect(config.database);
var q          = "uk"
var limit      = 1000;

var url = "https://www.coolcamping.co.uk/search?q=" + q + "&limit=1000" + limit;

scrape(url);

function scrape(url){
  return request.get(url, function(error, response, body){
    if (error) return (console.log(error));
    if (response.statusCode ===200)  
    {
     var $ = cheerio.load(body);

      $('td').each(function() {
        console.log($(this).text());

      });
    }
  })

}
  
  
  //then we want to sort through the table and return the children hrefs for the individual show pages for each park.
  //then we want to loop thru/refactor for each reagion and county

 

