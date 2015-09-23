//image server, serves static files
var express = require('express');
var app = express();
var morgan = require('morgan');
var parser = require('body-parser');
var Redis = require('ioredis');
var redis = new Redis();
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cors = require('cors');
var cookieParser = require('cookie-parser');
var routes = require('./routes.js');

var sessionStore = new RedisStore({
  host:'52.89.205.97',
  port: 6379
});
//server site
app.use(express.static(__dirname + '/../client/'));

app.use(session({
  store: sessionStore,
  secret: 'shak',
  resave: false,
  saveUninitialized: false
}))
app.use(morgan('combined'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
var initServer = function() {
  // attaches all the routes to the server
  routes.setup(app);

  var port = process.env.PORT || 3001;
  var server = app.listen(port);
  console.log("Express server listening on %d in %s mode", port, app.settings.env)
}
initServer();
exports.app = app;


