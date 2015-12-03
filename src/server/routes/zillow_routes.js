var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var Zillow = require('node-zillow');
// var zillowApiKey = 'X1-ZWz1f11zzzxx57_aovt1';



router.post('/callApi/', function(req, res, next) {
  var zillow = new Zillow('X1-ZWz1f11zzzxx57_aovt1');
  var parameters = {
    address: req.body.address,
    citystatezip: req.body.citystatezip
  };

  zillow.callApi('GetDeepSearchResults', parameters)
    .then(function(data) {
      var results = data.response[0].results[0].result[0];
      console.log(results);
      return results;

    }).then(function(data) {
      res.json(data);
    });

});

module.exports = router;
