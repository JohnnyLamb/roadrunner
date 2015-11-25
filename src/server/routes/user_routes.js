var express = require('express');
var router = express.Router();
var User = require('../models/users.js');


/////////////////////////////  GET ALL USERS
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
////////////////////////////   GET SINGLE USER
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


//////////////////////// // CREATE/POST USERS
router.post('/createuser', function(req, res, next) {
  var newUser = new User({
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  });

  newUser.save(function(err, data) {
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
    }
  });
});



//////////////////////////// DELETE SINGLE USER
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
