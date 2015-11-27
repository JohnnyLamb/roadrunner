var express = require('express');
var router = express.Router();
var Listing = require('../models/listings.js');
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../models/users.js');


/////////////////////////////  GET ALL USERS LISTINGS
router.get('/getusers', function(req, res, next) {
  User.find(function(err, data) {
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
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

//////////////////////// UPDATE USER LISTING
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

//////////////////////// // SAVE LISTING TO USER
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

// router.put('/:id/ships', function(req, res, next) {
//     var newShip = new Ship(req.body);
//     newShip.saveQ();
//     var update = { $push : {ships : newShip}};
//     var options = {new:true};
//     var id = req.params.id;

//     User.findByIdAndUpdateQ(id, update, options)
//     .then(function(result) {
//         res.json(result);
//     })
//     .catch(function(err) {
//         res.send(err);
//     });
// });



//////////////////////////// DELETE USER LISTING
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
