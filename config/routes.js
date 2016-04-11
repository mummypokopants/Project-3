var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST


var hdb = require('../seeds/hdb');

var ura = require('../seeds/ura');

var pte = require ('../seeds/private');

router.get('/carparks/locations', (req,res) => {
  console.log('locations');
  var data1 = hdb.map(function (carpark) {
    var carparkWithAddressOnly = {};
    carparkWithAddressOnly['address'] = carpark.address;
    carparkWithAddressOnly['type'] = 'HDB'
    return carparkWithAddressOnly;
  });
  var data2 = ura.map(function (carpark) {
    var carparkWithAddressOnly = {};
    carparkWithAddressOnly['address'] = carpark.URA_CARPARK_NAME;
    carparkWithAddressOnly['type'] = 'URA'
    return carparkWithAddressOnly;
  });
  var data3 = pte.map(function(carpark){
    var carparkWithAddressOnly = {};
    carparkWithAddressOnly['address'] = carpark.address;
    carparkWithAddressOnly['type'] = 'Private'
    return carparkWithAddressOnly;
  });
  res.json(data1.concat(data2, data3));

});




//  DBs(1)
// router.route('/*****')
//     .get(*****.getAll)
//     .post(*****.createQuote);
// router.route('/*****/:id')
//     .get(*****.getQuote)
//     .patch(*****.updateQuote)
//     .delete(*****.removeQuote);
//
// // DBs(2)
// router.route('/*****')
//     .get(*****.getAll)
//     .post(*****.createQuote);
// router.route('/*****/:id')
//     .get(*****.getQuote)
//     .patch(*****.updateQuote)
//     .delete(*****.removeQuote);
//
// // DBs(3)
// router.route('/*****')
//     .get(*****.getAll)
//     .post(*****.createQuote);
// router.route('/*****/:id')
//     .get(*****.getQuote)
//     .patch(*****.updateQuote)
//     .delete(*****.removeQuote);

module.exports = router;
