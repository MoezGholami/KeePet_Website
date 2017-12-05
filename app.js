require('dotenv').config()
const nodemailer    = require('nodemailer');
const appRoot       = require('app-root-path');
const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const mongoose      = require("mongoose");
const passport      = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User          = require(appRoot + "/domain/models/user");

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
app.use(bodyParser.urlencoded({ extended: false }));
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


passport.use(new GoogleStrategy(
  {
    "clientID": process.env.CLIENT_ID,
    "clientSecret": process.env.CLIENT_SECRET,
    "callbackURL": process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  // done(null, user.id);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  // Users.findById(obj, done);
  done(null, obj);
});

//connect to mongod server
var url = 'mongodb://'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;
mongoose.connect(url);

app.use('/', index);
app.use('/users', users);
app.use('/owner', owner);
app.use('/manage', manage);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Authenticated successfully
    res.redirect('/owner');
});

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
