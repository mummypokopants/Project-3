var express    = require('express')
var engine     = require('ejs-locals')
var path       = require('path')
var logger     = require('morgan')
var bodyParser = require('body-parser')
var mongoose   = require('mongoose')
var helpers    = require('express-helpers')
var connect        = require('connect')
var methodOverride = require('method-override')
var config = require('./config/config')
var app = express()


app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

helpers(app);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

var mongoose = require('mongoose');
var db = mongoose.connection;

// connect to the db
mongoose.connect(config.db);


app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept');
  // If someone calls with method OPTIONS, let's display the allowed methods on our API
  if (req.method == 'OPTIONS') {
    res.status(200);
    res.write("Allow: GET,PUT,POST,DELETE,OPTIONS");
    res.end();
  } else {
    next();
  }
});

// start db
db.on('error', console.error);
db.once('open', function() {

  /**
   *
   * In case we want other routes to be unprotected, let's just make sure that
   * /carpark* and /user* are validated, the rest will not be authenticated like the
   * /login route for instance
   *
   */
  app.all('/carpark*', [require('./auth/validate')]);
  app.all('/user*', [require('./auth/validate')]);
  app.use('/',require('./routes'));

  // If no route is matched, return a 404
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Start the server
  app.set('port', process.env.PORT || 3000);


  var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });
  });


  // curl -H "content-type:application/json" http://localhost:3000/login -d '{
  //   "username":"ga@wdi.com",
  //   "password":"mommypoko"
  // }'
