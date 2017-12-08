require('dotenv').config()
const nodemailer  = require('nodemailer');
const appRoot     = require('app-root-path');
var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var mongoose      = require("mongoose");
var passport      = require("passport");
var LocalStrategy = require("passport-local");
var User          = require(appRoot + "/domain/models/user");

var index   = require(appRoot + '/routes/index');
var users   = require(appRoot + '/routes/users');
var owner   = require(appRoot + '/routes/owner');
var manage  = require(appRoot + '/routes/manage');

var app = express();

var mail = require(appRoot + '/mailer');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport config
app.use(require("express-session")({
	secret: process.env.EXPRESS_SESSIONS_SECRET,
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connect to mongod server
var url = 'mongodb://'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;
mongoose.connect(url);

app.use('/', index);
app.use('/users', users);
app.use('/owner', owner);
app.use('/manage', manage);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

////////////////
//test email send

//var newMail = new mail();

////////////////

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, "127.0.0.1", function() {
	console.log("launch success");
});

module.exports = app;
