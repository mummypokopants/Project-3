
var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'), //used to manipulate POST
    _ = require('underscore')
var Carpark = require('../models/carpark')
var hdb = require('../data/hdb');
var ura = require('../data/ura');
var pte = require ('../data/private');

var express = require('express');
var router = express.Router()
var bodyParser = require('body-parser')
var methodOverride = require('method-override')


var auth = require('../auth/auth'),
    user = require('../dao/users'),
    hdb = require('../seeds/hdb'),
    ura = require('../seeds/ura'),
    pte = require ('../seeds/private');
<<<<<<< HEAD

=======
>>>>>>> 2bcc7e34abfe066883062f57a2a3095cae865637

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
<<<<<<< HEAD
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
=======
res.render("mainlayout")
}
)
>>>>>>> 2bcc7e34abfe066883062f57a2a3095cae865637

// function getAll(request,response){
//   Candy.find((error,candies) =>{
//     if (error) response.json({message:"candy not found"});
//     response.render("layout",{candies: candies});
//   });
// }


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
