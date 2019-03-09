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
var ajaxRouter = require('./routes/ajax');
var valentineRouter = require('./routes/valentine');
var sularoidRouter = require('./routes/sularoid');
var instaRouter = require('./routes/insta');
var ryulRouter = require('./routes/ryul');
var flowerRouter = require('./routes/flower');
var flower2Router = require('./routes/flower2');
var dbRouter =  require('./routes/db');
var dbemailRouter=require('./routes/dbemail');
var flower2ResultRouter=require('./routes/flower2Result.js');
var flowerResultRouter=require('./routes/flowerResult.js');
var instaResultRouter=require('./routes/instaResult.js');
var sularoidResultRouter=require('./routes/sularoidResult.js');



var app = express();

app.use(session({
    secret: 'pulsepulse', 
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser({limit: '50mb'}));

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
app.use('/ajax',ajaxRouter);
app.use('/sularoid',sularoidRouter);
app.use('/valentine',valentineRouter);
app.use('/insta',instaRouter);
app.use('/ryul',ryulRouter);
app.use('/flower',flowerRouter);
app.use('/flower2',flower2Router);
app.use('/dbemail',dbemailRouter);
app.use('/ajax/flower2Result', flower2ResultRouter);
app.use('/flowerResult', flowerResultRouter);
app.use('/instaResult', instaResultRouter);
app.use('/sularoidResult', sularoidResultRouter);
app.use('/db', dbRouter);

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
