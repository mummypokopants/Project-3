var Carpark = require('../models/carpark');
var carparks = {

  getAll: function(req, res) {
    Carpark.find(function (err,carparks) {
      if (err) {
        console.log(err);
      } else {
        res.send(carparks);
      }
    });
  },

module.exports = carparks;
