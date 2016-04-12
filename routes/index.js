var express = require('express');
var router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var auth = require('../auth/auth');
var user = require('../dao/users');

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


/*
 * Login, accessible by anyone, you can find the logic for login function in auth/validate.js
 */
router.post('/login', auth.login);
/*
 * Routes for users
 *  -Only accessible by role admin.
 *  -The logic that controls that is located in the user data access object)
 */
router.get('/users', user.getAll);
router.get('/user/:id', user.getOne);
router.post('/user/', user.create);
router.put('/user/:id', user.update);
router.delete('/user/:id', user.delete);

module.exports = router;
