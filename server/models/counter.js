var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var Counter = new Schema({
  name: String,
  count: Number
});


mongoose.connect(process.env.MONGO_URI);

module.exports = mongoose.model('counters', Counter);
