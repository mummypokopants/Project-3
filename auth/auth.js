var jwt = require('jwt-simple');
var User = require('../models/user');
var config = require('../config/config');
var bcrypt = require('bcrypt');

var auth = {

  login: function(req, res) {
    console.log(req.body)
    
    var username = req.body.username || '';
    var password = req.body.password || '';
    console.log('u: ' + username);
    console.log('p: ' + password);
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid cred"
      });
      return;
    }

    // Query to db
    auth.getUser(username, function(dbUserObj,err) {
      if (!dbUserObj) { // If authentication fails
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credent"
        });
        return;
      }

      if (dbUserObj) {

        // If authentication is success, generate token
        bcrypt.compare(password,dbUserObj.password, function(err, passmatch) {
            if (passmatch == true) {
              res.json(genToken(dbUserObj));
            } else {
              res.status(401);
              res.json({
                "status": 401,
                "message": "Invalid credentials"
              });
              return;
            }
        });
      }
    });

  },

  getUser: function(username,callback) {
      User.findOne({ username: username }, function (err,user) {
        if (err) {
          console.log(err);
          callback(false);
        } else {
          callback(user);
        }
      });
  },

  isUserAdmin: function(username,callback) {
      User.findOne({ username: username }, function (err,user) {
        if (user.role == 'admin') {
          callback(true);
        } else {
          callback(false);
        }
      });
  },
  encryptPass: function(password,callback) {
      // this will auto-gen a salt
      // bcrypt.hash(password,size of hash, function)
      bcrypt.hash(password, 12, function(err, hash) {
        if (hash) {
          callback(hash);
        } else {
          console.log(err);
        }
      });
  }
}

/** private methods **/

// generate token
function genToken(user) {
  var expires = expiresIn(1); // 1 days
  var token = jwt.encode({
    exp: expires
  }, config.jwtsecret);

  return {
    token: token,
    expires: expires,
    user: user.username
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
