var express    = require('express')
var engine     = require('ejs-locals')
var path       = require('path')
var logger     = require('morgan')
var bodyParser = require('body-parser')
var mongoose   = require('mongoose')
var helpers    = require('express-helpers')
var connect        = require('connect')
var methodOverride = require('method-override')
var app = express();

// Have not set up security, have to decide what feature to include
// Also include the connects as well as if needed static requirements, connect timeout and compression

// Will store connections here

app.use(methodOverride('_method'))
mongoose.connect('mongodb://localhost:27017/carparks')


var routes = require('./config/routes');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set to true if parsing url as json


helpers(app);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));


app.use(routes);

app.listen(3000);
