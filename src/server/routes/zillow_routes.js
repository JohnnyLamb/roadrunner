var express = require('express');
var router = express.Router();
var User = require('../models/users.js');

var zillowApiKey = 'X1-ZWz1f11zzzxx57_aovt1';


/////////////////////////////  GET ALL USERS
router.get('/http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1f11zzzxx57_aovt1&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA', function(req, res, next) {
   console.log('THIS IS BACKEND');
  console.log(req.body);
  res.send(req.body);
});




module.exports = router;
