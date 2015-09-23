var Redis = require('ioredis');
var redis = new Redis(6379, '52.89.205.97');
var bcrypt = require('bcryptjs');


var comparePasswords = function (passwordProvided, passwordDb, callback) {
  bcrypt.compare(password, passwordDb, function (err, result) {
    console.log('password ', password, result);
    if (err || !result) {
      callback(false);
    }else {
      callback(true);
    }
  });
}

var generateHashedPassword =  function(pass) {
  var salt = bcrypt.genSaltSync(10);
  console.log('salt ', salt);
  console.log('pass ', pass);
  var hash = bcrypt.hashSync(pass, salt);
  return hash;
}

var userDne  = function(user, cb){
  console.log('user ', user);
  redis.hget('users', user, function(err, result){
    if(err){
      console.log('err ', err);
      cb(false);
    } else {
      console.log('hget result ', result);
      cb(result);
    }
  })
}

module.exports = {
  login: function (req, res, next) {
    var user = req.body;
    console.log('login');
    userDne(user.username, function(userExists){
      if(userExists) {
        console.log('user exists, checking passwords');
        if(bcrypt.compareSync(user.password, userExists)){
          
          console.log('sessionID ', req.sessionID);
          console.log('session before setting user.username signup ', req.session);
          req.session.email = user.username;
          console.log('session after creation ', req.session);

          res.status(201).json({status: 'user authenticated'});
        } else {
          res.status(400).json({error: 'User or Password invalid'});
        }
      } else {
        res.status(400).json({error: 'User or Password invalid'});
      }
    })
  },
  signup: function (req, res, next) {
    var user = req.body;
    console.log('signup');
    userDne(user.username, function(userExists){
      if(userExists) {
        res.status(400).json({status: 'user exists'});
      } else {
        console.log('generating salt');
        var salt = generateHashedPassword(user.password);
        redis.hset('users', user.username, salt);
        console.log('sessionID ', req.sessionID);
        console.log('session before setting user.username signup ', req.session);
        
        req.session.save(function(err) {
          // will have a new session here 
        })
        req.session.email = user.username;
        console.log('session after creation ', req.session);
        res.status(201).json({status: 'user created'});
      }
    });

  },
  checkUser: function(req, res, next) {
    var isLoggedIn = !!req.session.email;
    if(isLoggedIn){
      res.status(200).json({status: 'Logged in'});
    } else {
      res.status(200).json({status: 'not logged in'});
    }
    
  },
  isAuth: function (req, res, next) {
    console.log('request session ' , req.session);
    if (req.session.email) {
      next();
    }else {
      res.status(401).json({error: 'Not allowed'});
    }
  },
  logout: function(req, res, next) {
    req.session.email = null;
    res.status(200).json({status: 'Logout successful'});
  }
};




