var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
  name: String,
  description: String,
  author: String,
  price: Number
});

module.exports = mongoose.model('Application', ApplicationSchema);

