var appConfig = require('./config').appConfig;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

require('./model/transaction_group');

mongoose.connect(appConfig.mongodbConfig.dbURL);

// models loading
//var models_path = __dirname + '/models';
//var walk = function(path) {
//    fs.readdirSync(path)
//        .forEach(function(file) {
//            var newPath = path + '/' + file;
//            var stat = fs.statSync(newPath);
//
//            if (stat.isFile()) {
//                if (/(.*)\.(js|coffee)/.test(file)) {
//                    require(newPath)
//                }
//            }
//            else if (stat.isDirectory()) {
//                walk(newPath)
//            }
//        })
//};
//walk(models_path);

// var routes = require('./routes/index');
// var users = require('./routes/users');
var router_page = require('./routes/router_page');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({limit : '5mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit : '5mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

// app.use('/', routes);
// app.use('/users', users);
app.use('/', router_page);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
