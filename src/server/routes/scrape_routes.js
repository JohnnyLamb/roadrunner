var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose-q')(require('mongoose'));
/////////////////////////////  SCRAPE CRAIGSLIST
router.post('/scrape/', function(req, res) {
  // console.log(req.body.location," payload ");
  var titles = [];
  var title;
  var location = req.body.location;
  var minPrice = req.body.minPrice;
  var maxPrice = req.body.maxPrice;


  request('http://www.zillow.com/homes/for_sale/'+location+'-CO/pmf,pf_pt/house,condo,apartment_duplex,mobile,townhouse_type/11093_rid/'+minPrice+'-'+maxPrice+'_price/556-1112_mp/39.878127,-104.49543,39.649583,-105.216408_rect/10_zm/', function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      $('.property-address').filter(function() {
        var data = $(this);
        title = data.text();
        titles.push(title);
      });
      // $('.property-address').filter(function() {
      //   var data = $(this);
      //   title = data.text();
      //   titles.push(title);
      // });
      res.json(titles);

    }
  });
});











/////////////////////////////  SCRAPE CRAIGSLIST
// router.get('/scrape', function(req, res) {
//   var titles = [];
//   var title;
//   request('https://denver.craigslist.org/search/rea?sort=date&srchType=T&postedToday=1&query=denver', function(error, response, html) {
//     // First we'll check to make sure no errors occurred when making the request

//     if (!error) {

//       var $ = cheerio.load(html);

//       $('.pl').filter(function() {

//         var data = $(this);
//         title = data.children().next().text();
//        //
//        titles.push(title);

//         // In examining the DOM we notice that the title rests within the first child element of the header tag.
//         // Utilizing jQuery we can easily navigate and get the text by writing the following code:

//         // title = data.children().first().text();

//         // Once we have our title, we'll store it to the our json object.

//         // json.title = title;
//       });

//       for(var i = 0; i<titles.length;i++){
//         console.log(titles[i]);
//        }
//        // console.log(titles);
//       // var json = { title : "", release : "", rating : ""};
//     }
//   });
// });






module.exports = router;
