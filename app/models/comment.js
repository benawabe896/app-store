var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  application_id: String,
  description: String
});

module.exports = mongoose.model('Comment', CommentSchema);

