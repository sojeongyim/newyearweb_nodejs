var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser'); 

//var mysql = require('mysql');
//var dbconfig = require('./routes/database.js') 
//var connection = mysql.createConnection(dbconfig);

var indexRouter = require('./routes/index');
var mainRouter = require('./routes/main');
var uploadRouter = require('./routes/upload');
var ajaxRouter = require('./routes/ajax');
var filterpickRouter = require('./routes/filterpick');

var app = express();

app.use(session({
    secret: 'pulsepulse', 
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser({limit: '30mb'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'temp')));

app.use('/', indexRouter);
app.use('/main', mainRouter);
app.use('/upload',uploadRouter);
app.use('/ajax',ajaxRouter);
app.use('/filterpick',filterpickRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
