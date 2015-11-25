var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({

  email:String,
  password:String,
  phone:Number
});


module.exports = mongoose.model('users',User);
