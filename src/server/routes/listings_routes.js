var express = require('express');
var router = express.Router();
var Listing = require('../models/listings.js');
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../models/users.js');


//////////////////////// SAVE SEARCH TEMPLATE FOR AREA

router.post('/createListingTemplate', function(req, res, next) {
  var newListing = new Listing({
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  });
  newListing.save(function(err, data) {
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
    }
  });
});




/////////////////////////////  GET ALL LISTINGS FROM SPECIFIC USER
router.get('/:userid/showlistings', function(req, res, next) {
    User.findById(req.params.userid)
    .populate('listings')
    // .populate('missions')
    .exec(function(err, user) {
        if(err) {
            res.send(err);
        } else {
            res.json(user.listings);
        }
    });
});



//////////////////////// // SAVE LISTING TO SPECIFIC USER
router.post('/:userid/createlisting', function(req, res, next) {
  var newListing = new Listing({
    location: req.body.location,
    price: req.body.price
  });
  newListing.saveQ();
  var update = { $push : {listings : newListing}};
  var options = {new:true};
  User.findByIdAndUpdateQ(req.params.userid,update,options,function(err, data) {
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
    }
  });
});


//////////////////////////// DELETE USERS SPECIFIC LISTING
// does not delete the object id but does delete the rest of the listing
router.delete('/:listingid/deletelisting', function(req, res, next) {
    Listing.findByIdAndRemove(req.params.listingid,
      function(err, data) {
        if(err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
});



module.exports = router;

// Below is some code that may be implemented later but is not currently being used.

//////////////////////// UPDATE SPECIFIC USER LISTING
// router.put('/:listingid/updatelisting',function(req,res,next){
//   var updatedListing = {
//     location:req.body.location,
//     price:req.body.price
//   };

//   User.findByIdAndUpdate(req.params.listingid,updatedListing,function(err,data){
//     if(err){
//       res.json({'message':err});
//     }else {
//       res.json(data);
//     }
//   });
// });
