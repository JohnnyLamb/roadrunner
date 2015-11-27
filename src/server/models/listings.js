var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Listing = new Schema({
  location:String,
  price:Number
});


module.exports = mongoose.model('listings',Listing);
