var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  email:{type:String,unique:true},
  password:String,
  phone:Number,
  listings: [{type: Schema.Types.ObjectId, ref : 'listings'}]
});


module.exports = mongoose.model('users',User);
