var request  = require ("request");
var cheerio  = require ("cheerio");
var mongoose = require("mongoose");
var Link     = require("./models/link");
var config   = require("./config/config");

mongoose.connect(config.database);

var region  = "South+East"
var county  = "London"

var url = "http://www.ukcampsite.co.uk/sites/results.asp?region= " + region + "&county=" + county;

scrape(url);

function scrape(url){
  return request.get(url, function(error, response, body){
    if (error) return (console.log(error));
    if (response.statusCode ===200)  console.log(response)
    {
      var $ = cheerio.load(body);
      // $('td').each(function() {
      //   var href = $(this).children("a").children("a.smallest").attr("href").match(/(?:revid=)(.*?)(?=/)
    console.log($(this).text());

      // });
    }
  })

}
  
  // So we want to return body response
  //then we want to sort through the table and return the children hrefs for the individual show pages for each park.
  //then we want to loop thru for each reagion and county

 

