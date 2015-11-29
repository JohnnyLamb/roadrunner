var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var Zillow = require('node-zillow');
// var zillowApiKey = 'X1-ZWz1f11zzzxx57_aovt1';



router.get('/test', function(req, res, next) {
var zillow = new Zillow('X1-ZWz1f11zzzxx57_aovt1');

 var parameters = {
    address:1251+'Lipan'+'St',
    citystatezip:80204

  };
 zillow.callApi('GetDeepSearchResults',parameters)
    .then(function(data) {
        var results = data.response[0].results[0].result[0];
        console.log(results);
      return results;

    }).then(function(data){
      res.json(data);
    });

});

module.exports = router;
