var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

/////////////////////////////  SCRAPE CRAIGSLIST
router.get('/scrape', function(req, res) {
  var titles;
  request('https://denver.craigslist.org/search/rea?sort=date&srchType=T&postedToday=1&query=denver', function(error, response, html) {
    // First we'll check to make sure no errors occurred when making the request

    if (!error) {

      var $ = cheerio.load(html);

      $('.pl').filter(function() {

        var data = $(this);
        titles = data.children().next().text();
       //

        // In examining the DOM we notice that the title rests within the first child element of the header tag.
        // Utilizing jQuery we can easily navigate and get the text by writing the following code:

        // title = data.children().first().text();

        // Once we have our title, we'll store it to the our json object.

        // json.title = title;
      });
       console.log(titles);
      for(var i = 0; i<titles;i++){
        console.log(titles);
       }
       // console.log(titles);
      // var json = { title : "", release : "", rating : ""};
    }
  });
});



module.exports = router;
