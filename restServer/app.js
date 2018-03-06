var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


/* -- Instanciate routes -- */
var index = require('./routes/index');
var users = require('./routes/usersRouter');
var itemRouter = require('./routes/markerRouter');
var dht = require('./routes/dhtRouter');
var bmp = require('./routes/bmpRouter');
var camera = require('./routes/cameraRouter');
var alarmes = require('./routes/alarmesRouter');
var streaming = require('./routes/streamingRouter');
var pir = require('./routes/pirRouter');
var video = require('./routes/videoRouter');



var connection = require('./connectionDB');
var insertData = require('./models/InsertData');
var alarmeIncendie = require('./models/AlarmeIncendie');
var app = express();


/* -- connect to mysql -- */
connection.init();

insertData.insert();


/* -- start app conf -- */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));  //can get long request...
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
app.use('/markers', itemRouter);
app.use('/dht', dht);
app.use('/bmp', bmp);
app.use('/camera', camera);
app.use('/alarmes', alarmes);
app.use('/streaming', streaming);
app.use('/pir', pir);
app.use('/video', video);


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
