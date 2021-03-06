var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var auth = require('./libs/auth');
var compression = require('compression');
var needRedis;
if (process.argv[2] == "redis") {
  needRedis = true;
}
else {
  needRedis = false;
}
if (needRedis) {
  var redisStore = require('connect-redis')(session);
  var redisClient = require('./libs/redisclient');
}

var indexRouter = require('./routes/index');
var statusRouter = require('./routes/status');
var historyRouter = require('./routes/history');
var applyRouter = require('./routes/apply');
var joinRouter = require('./routes/join');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var carRouter = require('./routes/car');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(needRedis ? {
  secret: 'hangzhou_police_agency',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  store: new redisStore({
    host: 'localhost',
    port: 6379,
    client: redisClient,
    ttl: 260 // this ttl means: if user doesn't do any operation in specified seconds, session will be expired
  })
} : {
  secret: 'hangzhou_police_agency',
  proxy: true,
  resave: true,
  saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.use('/login', loginRouter);
app.use('/join', joinRouter);
// for authentication
app.use(auth);
app.use('/index', indexRouter);
app.use('/history', historyRouter);
app.use('/status', statusRouter);
app.use('/apply', applyRouter);
app.use('/logout', logoutRouter);
app.use('/car', carRouter);

// fix favicon request 500 error.
// app.get('/favicon.ico', function(req, res) {
//     res.status(200).json({
//       status: 'successful',
//       errMsg: ''
//     });
// });

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
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
