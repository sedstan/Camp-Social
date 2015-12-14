var request  = require ("request");
var cheerio  = require ("cheerio");
var mongoose = require("mongoose");
var Link     = require("./models/link");
var config   = require("./config/config");

mongoose.connect(config.database);

var region     = []
var county     = []

{
  region: ["county1"]
}


var url = "http://www.ukcampsite.co.uk/sites/results.asp?region= " + region + "&county=" + county;



scrape(url);

function scrape(url){

}







