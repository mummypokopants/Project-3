var express = require('express');
var router = express.Router();

var auth = require('../auth/auth');
var carpark = require('../dao/carparks');
var user = require('../dao/users');


/*
 * Login, accessible by anyone, you can find the logic for login function in auth/validate.js
 */
router.post('/login', auth.login);

/*
 * Routes for carparks
 */
router.get('/carparks', carpark.getAll);
router.get('/carpark/:id', carpark.getOne);
router.post('/carpark/', carpark.create);
router.put('/carpark/:id', carpark.update);
router.delete('/carpark/:id', carpark.delete);

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
