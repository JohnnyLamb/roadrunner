var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose-q')(require('mongoose'));
/////////////////////////////  SCRAPE CRAIGSLIST
router.post('/scrape/', function(req, res) {
  var titles = [];
  var title;
  var location = req.body.location.trim();
  var minPrice = req.body.minPrice.trim();
  var maxPrice = req.body.maxPrice.trim();


  request('http://www.zillow.com/homes/for_sale/' + location + '-CO/fsba,fsbo,fore,cmsn_lt/house_type/11093_rid/' + minPrice + '-' + maxPrice + '_price/553-1107_mp/1_days/1_pnd/39.869168,-104.665032,39.567587,-105.098992_rect/10_zm/0_mmm/', function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      $('.property-address').filter(function() {
        var data = $(this);

        title = data.text();
        titles.push(title);
      });

      res.json(titles);
    }
  });
});

module.exports = router;
