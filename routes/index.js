var express = require('express');
var router = express.Router()
var bodyParser = require('body-parser')
var methodOverride = require('method-override')


var auth = require('../auth/auth'),
    user = require('../dao/users'),
    hdb = require('../seeds/hdb'),
    ura = require('../seeds/ura'),
    pte = require ('../seeds/private');

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


/*
 * Login, accessible by anyone, you can find the logic for login function in auth/validate.js
 */
router.post('/login', auth.login);
/*
 * Routes for users
 *  -Only accessible by role admin.
 */
router.get('/users', user.getAll);
router.get('/user/:id', user.getOne);
router.post('/user/', user.create);
router.put('/user/:id', user.update);
router.delete('/user/:id', user.delete);

module.exports = router;
