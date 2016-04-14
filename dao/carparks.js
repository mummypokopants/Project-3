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

  getOne: function(req, res) {
    var id = req.params.id;
    Carpark.findOne({ carparkid: id }, function (err,carpark) {
      if (err) {
        console.log(err);
      } else {
        if (carpark) {
          res.send(carpark);
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    });
  },

  create: function(req, res) {
    var body = req.body;
    Carpark.findOne({ carparkid: body.carparkid }, function (err,carpark) {
      if (err) {
        console.log(err);
      } else {
        if (carpark) {
          res.status(409);
          res.json({
            "status": 409,
            "message": "Carpark already exists."
          });
        } else {
          var newCarpark = new Carpark({
            carparkid: body.carparkid,
            carparkname: body.carparkname,
            abv: body.abv,
            year: body.year,
            description: body.description,
            total: body.total
          });
          newCarpark.save(function(err,newCarpark) {
            if (err) {
              return console.error(err);
            } else {
              res.json(newCarpark);
            }
          });
        }
      }
    });
  },

  update: function(req, res) {
    var body = req.body;
    var id = req.params.id;

    Carpark.findOne({ carparkid: id }, function (err,carpark) {
      if (err) {
        console.log(err);
      } else {
        if (carpark) {
          Carpark.findOneAndUpdate({carparkid:id},body, function (err,updatedcarpark) {
            if (err) {
              console.log(err);
            } else {
              res.json(updatedcarpark);
            }
          });
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    });

  },

  delete: function(req, res) {
    var id = req.params.id;
    Carpark.findOne({ carparkid: id }, function (err,carpark) {
      if (err) {
        console.log(err);
      } else {
        if (carpark) {
          Carpark.remove({carparkid: id}, function (err,carpark) {
            if (err) {
              console.log(err);
            } else {
              res.status(200);
              res.json({
                "status": 200,
                "message": "delete of " + id + " succeeded."
              });
            }
          });
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    });
  }
};

module.exports = carparks;
