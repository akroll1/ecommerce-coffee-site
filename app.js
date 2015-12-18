var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//adding in modules.
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var routesChoices = require('./routes/choices');
var routeDelivery = require('./routes/delivery');
var routePayment = require('./routes/payment');
var routeEmail = require('./routes/email');
var routeLogin = require('./routes/login');
var routeRegister = require('./routes/register');
var routeLogout = require('./routes/logout');
var routeThankyou = require('./routes/thankyou');
var routeStripe = require('./routes/stripe');
var routeAdmin = require('./routes/admin');
// var apiRoutes = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//SETTING UP SESSIONS
app.use(session({
  secret: 'Elladog1',
  resave: false,
  saveUninitialized: false
}));
//HAVE TO INCLUDE THIS, INITIALIZING PASSPORT.
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
//PASSPORT CONFIG, bringing in our Account schema
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
//serializeUser lets password be stored in cookies.
passport.deserializeUser(Account.deserializeUser());
// passport.serializeUser(function (user,done){
//   done(null, user.id);
// });
// passport.deserializeUser(function (id,done){

// });

//MONGOOSE
mongoose.connect('mongodb://localhost:27017/coffee');
//mongoose.connect sets up our db collection right here.
app.use('/', routes);
app.use('/choices', routesChoices);
app.use('/delivery', routeDelivery);
app.use('/payment', routePayment);
app.use('/email', routeEmail);
app.use('/login', routeLogin);
app.use('/register', routeRegister);
app.use('/logout', routeLogout);
app.use('/thankyou', routeThankyou);
app.use('/stripe', routeStripe);
app.use('/admin', routeAdmin);

// app.use('/api', apiRoutes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
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
