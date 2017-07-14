var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');
var mongoose=require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
mongoose.connect('mongodb://localhost/jkc',function(err,success){
if(err){
  return console.log(err);
}
else{
  return console.log("server connected");
}
});
var app = express();

//app.use(function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
   //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
   //res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, Accept'); // add remove headers according to your needs
   //next();
//})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:"hgwuygfjhbddb4gh3",saveUninitialized:true,resave:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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