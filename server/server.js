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


/** 
 * allows the server to automatically process urlencoded stuff into a javscript object
 * if we decided to pass JSON to the server instead we'll need to change this to parser.JSON()
 * 
 */

var sessionStore = new RedisStore({
  host:'127.0.0.1',
  port:6379,
  db : 1
});

app.use(cors());

//server site
app.use(express.static(__dirname + '/../app'));

console.log(__dirname + '../app');
// //serve images
// app.use(express.static(__dirname + '/images'));


app.use(session({
  store: sessionStore,
  secret: 'shak',
  resave: false,
  saveUninitialized: false
}))

// app.use(morgan('combined'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.use(function(req, res, next){
  console.log('sessionid :', req.sessionID,' req method : ', req.method, ' req url : ', req.url);
  next();
})//


var initServer = function() {
  // attaches all the routes to the server
  routes.setup(app);
  
  var port = process.env.PORT || 3001;
  var server = app.listen(port);
  console.log("Express server listening on %d in %s mode", port, app.settings.env)
}

initServer();
exports.app = app;


