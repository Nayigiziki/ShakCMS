//image server, serves static files
var express = require('express');
var app = express();
var morgan = require('morgan');
var parser = require('body-parser')
var session = require('express-session');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var routes = require('./routes.js');
var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/shak';
var MongoStore = require('connect-mongo')(session);
var sessionStore =  new MongoStore({ url: dbUrl});

var initServer = function() {
  // attaches all the routes to the server
  routes.setup(app);
  var port = process.env.PORT || 3000;
  var server = app.listen(port);
  console.log("Express server listening on %d in %s mode", port, app.settings.env)
}

mongoose.connect(dbUrl);
app.use(morgan('combined'));
app.use(express.static(__dirname + '/client/'));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());
app.use(session({
  store: sessionStore,
  secret: 'shak',
  resave: false,
  saveUninitialized: false
}))
initServer();
exports.app = app;


