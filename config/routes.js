var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var ***** = require('../controllers/*****');

//  DBs(1)
router.route('/*****')
    .get(*****.getAll)
    .post(*****.createQuote);
router.route('/*****/:id')
    .get(*****.getQuote)
    .patch(*****.updateQuote)
    .delete(*****.removeQuote);

// DBs(2)
router.route('/*****')
    .get(*****.getAll)
    .post(*****.createQuote);
router.route('/*****/:id')
    .get(*****.getQuote)
    .patch(*****.updateQuote)
    .delete(*****.removeQuote);

// DBs(3)
router.route('/*****')
    .get(*****.getAll)
    .post(*****.createQuote);
router.route('/*****/:id')
    .get(*****.getQuote)
    .patch(*****.updateQuote)
    .delete(*****.removeQuote);

module.exports = router;
