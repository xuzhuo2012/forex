var appConfig = require('./config/config').appConfig;
var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);


// Connect to mongodb
var connectMongoDB = function () {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect(appConfig.mongodbConfig.dbURL, options);
};
connectMongoDB();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connectMongoDB);


// auto mongoose model loading
var models_path = __dirname + '/app/models';
var loadModels = function(path) {
    fs.readdirSync(path)
        .forEach(function(file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);

            if (stat.isFile()) {
                if (/(.*)\.(js|coffee)/.test(file)) {
                    require(newPath)
                }
            }
            else if (stat.isDirectory()) {
                walk(newPath)
            }
        })
};
loadModels(models_path);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('common'));
app.use(bodyParser.json({limit : '5mb'}));
app.use(bodyParser.urlencoded({extended: true, limit : '5mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

// session persistency
app.use(session({
    secret : 'forex',
    resave : false,
    saveUninitialized : false,
    store : new mongoStore({
        url: appConfig.mongodbConfig.dbURL,
        collection: 'session'
    })
}));

// add router to app
var router = require('./config/router');
app.use(router);

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
