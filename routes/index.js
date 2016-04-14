var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    _ = require('underscore'),
    auth = require('../auth/auth'),
    user = require('../dao/users')

var Carpark = require('../models/carpark')
var hdb = require('../data/hdb');
var ura = require('../data/ura');
var pte = require ('../data/private');


router.get('/carparks/locations', (req,res) => {
  console.log('locations');
  var data1 = hdb.map(function (carpark) {
    var carparkWithAddressOnly = {};
    carparkWithAddressOnly['address'] = carpark.address;
    carparkWithAddressOnly['type'] = 'HDB';
    carparkWithAddressOnly['weekday7amto1030pm'] = '$0.50/30mins';
    carparkWithAddressOnly['weekday1030pmto7am'] = '$4.00/Night';
    carparkWithAddressOnly['Saturday7amto1030pm'] = '$0.50/30mins';
    carparkWithAddressOnly['Saturday1030pmto7am'] = '$4.00/Night';
    carparkWithAddressOnly['Sunday7amto1030pm'] = 'no charge';
    carparkWithAddressOnly['Sunday1030pmto7am'] = '$4.00/Night';
    return carparkWithAddressOnly;
  });
  var data2 = ura.map(function (carpark) {
    var carparkWithAddressOnly = {};
    carparkWithAddressOnly['address'] = carpark.name;
    carparkWithAddressOnly['type'] = 'URA';
    carparkWithAddressOnly['weekday7amto1030pm'] = '$0.50/30mins';
    carparkWithAddressOnly['weekday1030pmto7am'] = '$4.00/Night';
    carparkWithAddressOnly['Saturday7amto1030pm'] = '$0.50/30mins';
    carparkWithAddressOnly['Saturday1030pmto7am'] = '$4.00/Night';
    carparkWithAddressOnly['Sunday7amto1030pm'] = 'no charge';
    carparkWithAddressOnly['Sunday1030pmto7am'] = '$4.00/Night';

    return carparkWithAddressOnly;
  });
  var data3 = pte.map(function(carpark){
    var carparkWithAddressOnly = {};
    carparkWithAddressOnly['address'] = carpark.address;
    carparkWithAddressOnly['type'] = 'Private';
    carparkWithAddressOnly['weekday7amto1030pm'] = carpark.monFribefore6pmRates;
    carparkWithAddressOnly['weekday1030pmto7am'] = carpark.monFriafter6pmRates;
    carparkWithAddressOnly['Saturday7amto1030pm'] = '$0.50/30mins';
    carparkWithAddressOnly['Saturday1030pmto7am'] = '$4.00/Night';
    carparkWithAddressOnly['Sunday7amto1030pm'] = 'no charge';
    carparkWithAddressOnly['Sunday1030pmto7am'] = carpark.sunPHRates;
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


router.get("/carparks/views",(req,res)=>{
  res.render("mainlayout");
});

router.get('/carparks/search', (req, res) => {
  const query = RegExp(req.query.q, 'i')
  Carpark.find({address: query})
    // .limit(10)
    .exec(function(err, docs) {
      if (!err){
          console.log(docs);
          res.json(docs)
          // process.exit();
      } else {throw err;}
    });
})


module.exports = router;
