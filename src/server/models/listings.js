var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Listing = new Schema({
  location:String,
  minPrice:String,
  maxPrice:String,
  listingsArray:[]
});


module.exports = mongoose.model('listings',Listing);
