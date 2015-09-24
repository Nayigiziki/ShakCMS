var expect = require('chai').expect,
request = require('superagent'),
express = require('express'),
Redis = require('ioredis'),
redis = new Redis();



describe('Authentication', function() {
  var app = express();
  
  afterEach(function() {
    redis.flushall();
  });

  describe('register ', function () {

   var user = { 
    username: 'tj', 
    password: 'tobi' 
  };



  it('should create a new user', function (done) {
   request
   .post('http://127.0.0.1:3001/api/register')
   .send(user)
   .end(function(err, res){
    expect(res.status).to.equal(201);
    done();
  });

 });

  it('should not create a non-unique user', function (done) {
    request
    .post('http://127.0.0.1:3001/api/register')
    .send(user)
    .end(function(err, res){
      request
      .post('http://127.0.0.1:3001/api/register')
      .send(user)
      .end(function(err, response){
        expect(response.status).to.equal(400);
        done();
      });
    });
  });
});

  describe('login', function () {

    it('should not login a user that does not exists', function (done) {
      user = {
        username: 'dne',
        password: 'dne'
      }
      request
      .post('http://127.0.0.1:3001/api/login')
      .send(user)
      .end(function(err, res){
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should login a user that exists', function (done) {
      request
      .post('http://127.0.0.1:3001/api/register')
      .send(user)
      .end(function(err, res){
        request
        .post('http://127.0.0.1:3001/api/login')
        .send(user)
        .end(function(err, response){
          expect(response.status).to.equal(201);
          done();
        });
      });
    });



  });

  describe('logout', function () {
   var user = { 
    username: 'tj', 
    password: 'tobi' 
  };

    it('should logout a user that is logged in' , function (done) {
      request
      .post('http://127.0.0.1:3001/api/register')
      .send(user)
      .end(function(err, res){
        request
        .post('http://127.0.0.1:3001/api/login')
        .send(user)
        .end(function(err, response){
          expect(response.status).to.equal(201);
          request
          .get('http://127.0.0.1:3001/api/logout')
          .end(function(err, response){
            expect(response.status).to.equal(200);
            done();
          });
        });
      });
    });
  });

  describe('view protection', function () {
    var user = { 
      username: 'tj', 
      password: 'tobi' 
    };
   
    it('should confirm that a non-authenticated user is not logged in' , function (done) {
      request
        .get('http://127.0.0.1:3001/api/isAuth')
        .end(function(err, res){
          expect(res.text).to.equal('{"status":"not logged in"}');
          done();
        });

    });

  });

});