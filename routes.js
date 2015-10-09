var authentication = require('./controllers/authentication');

var setup = function(app) {
  //need tests
  app.post('/api/register', authentication.signup);
  app.post('/api/login' , authentication.login);
  app.get('/api/logout', authentication.logout);
  app.get('/api/isAuth', authentication.checkUser);
  app.post('/api/images', function (req, res) {

  });

  app.post('/api/projects', function(req, res){

  });

  //default response
  app.get('*', function(req, res) {
    res.send('what?');
  });


};

module.exports.setup = setup;

