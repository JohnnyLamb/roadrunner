var express = require('express');
var router = express.Router();
var Listing = require('../models/listings.js');
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../models/users.js');
var CronJob = require('cron').CronJob;
var request = require('request');
var cheerio = require('cheerio');
var config = require('../config');

console.log(config.twilio.twilio1);


// new CronJob('*/15 * * * *', function() {

//   console.log('You will see this message when the cron job is done');
// }, null, true, 'America/Denver');

var client = require('twilio')(config.twilio.twilio1, config.twilio.twilio2);

/// CREATE CRON JOB THAT WILL RUN EVERY TEN MINUTES/////
/// INSIDE CRON JOB QUERY DATABASE FOR LISTINGS/////////
/// WRITE A LOOP THAT TAKES THE LOCATION, MIN, MAX, ARRAY FOR EACH LISTING AND FEEDS IT INTO THE SCRAPE AND COMPARE ALGORITHM//////////
//// IF THERE IS A CHANGE THEN TEXT MESSAGE YOURSELF ABOUT THE CHANGE///////

function compareScrapeToDbFunction(location, minPrice, maxPrice, listingsArray, id) {
  // console.log(location,minPrice,maxPrice,listingsArray);
  // console.log(listingsArray[0]);
  var toCheckFromDb = listingsArray[0];
  var scrapeTitles = [];
  var title;
  var idFromDb = id;

  request('http://www.zillow.com/homes/for_sale/' + location + '-CO/fsba,fsbo,fore,cmsn_lt/house_type/11093_rid/' + minPrice + '-' + maxPrice + '_price/553-1107_mp/1_days/1_pnd/39.869168,-104.665032,39.567587,-105.098992_rect/10_zm/0_mmm/', function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      $('.property-address').filter(function() {
        var data = $(this);
        title = data.text();
        scrapeTitles.push(title);
      });
    }
    if (scrapeTitles[0] === toCheckFromDb) {
      // DO NOTHING
      console.log('this is if they are the same', scrapeTitles[0] + "   " + toCheckFromDb);
    }
    if (scrapeTitles[0] !== toCheckFromDb) {
      // UPDATE THE DATABASE
      console.log('this is if they are different', scrapeTitles[0] + "   " + toCheckFromDb);

      console.log(scrapeTitles, ' this is the array of listings from the scrape')

      var updatedListing = {
        "listingsArray": scrapeTitles
      };

      Listing.findByIdAndUpdate(idFromDb, updatedListing, function(error, data) {
        if (error) {
          res.json({
            'message': error
          });
        } else {
          console.log(data, ' hey this is inside listing update');
          // TWILIO FUNCTION BELOW //
          client.sms.messages.post({
            to: '+13035135606',
            from: '+1 251-304-9672',
            body: 'There is a new house near '+location+' '+scrapeTitles[0]+' !'
          }, function(err, text) {
            console.log('You sent: ' + text.body);
            console.log('Current status of this text message is: ' + text.status);
          });
        }
      });
    }
  });
}

new CronJob('*/15 * * * *', function() {
Listing.find(function(err, data) {
  if (err) {
    res.json({
      'message': err
    });
  } else {
    for (var i = 0; i < data.length; i++) {

      compareScrapeToDbFunction(data[i].location, data[i].minPrice, data[i].maxPrice, data[i].listingsArray, data[i]._id);
    }

  }
});
  console.log('cron job done');
}, null, true, 'America/Denver');



module.exports = router;
