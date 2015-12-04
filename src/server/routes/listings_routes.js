var express = require('express');
var router = express.Router();
var Listing = require('../models/listings.js');
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../models/users.js');
var CronJob = require('cron').CronJob;
var text = require('textbelt');

var client = require('twilio')('AC85148738df5f0791787140839270cec7', 'a6c87f9a3e0edfa9f41d30f3fd0e8b72');

//Send an SMS text message





// new CronJob('* 01 * * * *', function() {

//   console.log('You will see this message when the cron job is done');
// }, null, true, 'America/Denver');








//////////////////////// SAVE SEARCH TEMPLATE FOR AREA TO A USER
///// FIRST, FIND THE USER, THEN CHECK TO SEE IF THE USERS LISTING IS NEW OR OLD, IF IT IS OLD DO NOTHING, IF IT IS NEW UPDATE THE LISTING ARRAY.
/////////////////////////////////////////////////////////////////////////////

router.post('/:userid/updateListings', function(req, res, next) {
  // console.log(req.body, ' this is the body');

// client.sms.messages.post({
//     to:'+17192383915',
//     from:'+1 251-304-9672',
//     body:'I love you baby! This is from my app!'
// }, function(err, text) {
//     console.log('You sent: '+ text.body);
//     console.log('Current status of this text message is: '+ text.status);
// });


  var toCheck = req.body.listingsArray[0];
  // var demoCheck = req.body.listingsArray[0];
  console.log(toCheck, ' this is to check');
  var newListing = new Listing(req.body);

  // newListing.saveQ();

  Listing.find({
      location: req.body.location,
      minPrice: req.body.minPrice,
      maxPrice: req.body.maxPrice
    }).
    // where('listingsArray').equals(toCheck).
  where('maxPrice').equals(req.body.maxPrice).
  where('minPrice').equals(req.body.minPrice).
  where('location').equals(req.body.location).
  exec(function(err, listing) {
    console.log(listing, ' this is the result of the query');
    // console.log(listing[0].listingsArray[0],' this is right after the query');
    if (listing[0] === undefined) {
      // this means it is not in the database yet... save it!
      console.log('youre doing it peter! Its being saved!');
      newListing.saveQ();
    } else if (listing[0].listingsArray[0] === toCheck) {
      console.log('this means there is a match and you should not do anything');
      // console.log(listing[0].listingsArray[0]);
    } else {
      //     // update logic will eventually go in here! with notification logic
      console.log('johnny i think you are close! update now!');

      listingarray = listing[0].listingsArray;
      listingarray.unshift(toCheck);

      console.log(listingarray, ' this is the listingsArray');
      var updatedArray = listingarray;

      var updatedListing = {
        // "location": req.body.location,
        // "minPrice": req.body.minPrice,
        // "maxPrice": req.body.maxPrice,
        "listingsArray": updatedArray
      };
      console.log(updatedListing, ' this is the updated listing');
      var options = {
        new: true
      };
      // console.log(updatedListing.listingsArray, ' this is coming backfrom updatelisting');

      console.log('right before update', listing[0]);
      listing[0].update(updatedListing, function(error, data) {
        if (error) {
          res.json({
            'message': error
          });
        } else {
          console.log(data, ' hey this is inside listing update');
          res.json(data);
        }
      });
    }
  });
});



/////////////////////////////  GET ALL LISTINGS FROM SPECIFIC USER
router.get('/getlistings', function(req, res, next) {
  console.log(req.body, ' getting here');
  Listing.find(function(err, data) {
    if (err) {
      res.json({
        'message': err
      });
    } else {
      console.log(data);
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
  var update = {
    $push: {
      listings: newListing
    }
  };
  var options = {
    new: true
  };
  User.findByIdAndUpdateQ(req.params.userid, update, options, function(err, data) {
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
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
});

// options = {
//   new: true,
//   upsert: true
// }

// findOne({name: 'mike'}, options, function(err, rsults){
//   console.log(results)
// })

// router.post('/:userid/updateListings', function(req, res, next) {
//   // console.log(req.body.listingsArray[0],' this is the body');
//   console.log(fakeArray[0]);
//   var toCheck = req.body.listingsArray[0];
//   console.log(toCheck);
//   var newListing = new Listing(req.body);
//   Listing.findOne({
//     "location": "DENVER",
//     "maxPrice": '300000',
//     "minPrice": '150000',
//   }, function(err, listing) {
//     console.log(listing, 'this is to check if you got the listing');
//     if (listing === null) {
//       console.log('there is nothing like that yet, mongo will save it to the database');
//       newListing.saveQ();
//     } else if (listing.listingsArray[0] === toCheck) {
//       // IF IT's THE SAME DOO NOTHING!!!!
//       console.log('this means they are the same and you should not do anything!');
//       res.json(listing);
//     } else if (listing.listingsArray[0] !== toCheck) {
//       // update logic will eventually go in here! with notification logic
//       console.log('johnny i think you are close! you need to update now!');
//       var updatedListing = {
//         "location": "DENVER",
//         "maxPrice": '300000',
//         "minPrice": '150000',
//         "listingsArray":'Keep going! you can get this!'
//       };
//       Listing.update(updatedListing, function(err, data) {
//         if (err) {
//           res.json({
//             'message': err
//           });
//         } else {
//           console.log(data);
//           res.json(data);
//         }
//       });
//     } else {
//       console.log('nothing happened yo');
//     }
//   });
// });


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

// THIS CODE WAS THE CORRECT QUERY FOR FINDING A SPECIFIC LISTING!

// var fakeArray = ["1660 Verbena St, Denver, CO80220",
//     "20480 Randolph Pl, Denver, CO80249",
//     "21123 E 45th Ave, Denver, CO80249",
//     "4252 Quivas St, Denver, CO80211",
//     "3145 W 19th Ave, Denver, CO80204",
//     "1350 S Duquesne Cir, Aurora, CO80018",
//     "3861 S Truckee Way, Aurora, CO80013",
//     "6431 Eaton St, Arvada, CO80003",
//     "2849 S Olathe Way, Aurora, CO80013",
//     "2177 S Memphis St, Aurora, CO80013",
//     "761 Leo Ln, Thornton, CO80260",
//     "2923 Monaco Pkwy, Denver, CO80207"];
