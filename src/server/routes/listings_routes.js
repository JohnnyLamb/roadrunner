var express = require('express');
var router = express.Router();
var Listing = require('../models/listings.js');
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../models/users.js');


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



////////////////////////////   GET USERS SINGLE LISTING
router.get('/:userid/getuser', function(req, res, next) {
  User.findById(req.params.userid,function(err, data) {
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
    }
  });
});

//////////////////////// UPDATE SPECIFIC USER LISTING
router.put('/:userid/updateuser',function(req,res,next){
  var updatedUser = {
    email:req.body.email,
    password:req.body.password,
    phone:req.body.phone
  };
  User.findByIdAndUpdate(req.params.userid,updatedUser,function(err,data){
    if(err){
      res.json({'message':err});
    }else {
      res.json(data);
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
router.delete('/:userid/deleteuser', function(req, res, next) {
  User.findByIdAndRemove(req.params.userid,function(err, data) {
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
    }
  });
});



module.exports = router;
