var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  email:{type:String,unique:true},
  password:String,
  phone:Number
});


module.exports = mongoose.model('users',User);
