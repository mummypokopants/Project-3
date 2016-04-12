var mongoose = require('mongoose');

var carparkSchema = mongoose.Schema({
  carparkid: String,
  carpark: String,
  abv: String,
  year: String,
  description: String,
  total: Number
});

module.exports = mongoose.model('Carpark', carparkSchema);
