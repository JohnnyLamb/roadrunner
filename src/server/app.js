// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var Zillow = require('node-zillow');
// *** routes *** //
var routes = require('./routes/index.js');
var user_routes = require('./routes/user_routes.js');
var listing_routes = require('./routes/listings_routes.js');
var zillow_routes = require('./routes/zillow_routes.js');
var scrape_routes = require('./routes/scrape_routes.js');
var cron_routes = require('./routes/cron.js');
var dotenv = require('dotenv');
// dotenv.load();




// *** express instance *** //
var app = express();


var config = require('./config');

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/roadrunner-development';

mongoose.connect(mongoURI, function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + mongoURI);
  }
});


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));


// *** main routes *** //
app.use('/', routes);
app.use('/users', user_routes);
app.use('/listings', listing_routes);
app.use('/zillowapi', zillow_routes);
app.use('/scrapeZillow', scrape_routes);
app.use('/cron', cron_routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
