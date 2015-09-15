var authentication = require('./controllers/authentication');


var setup = function(app) {

  app.post('/api/images', function (req, res) {
    var fileName = req.body.fileName;
    var image = req.body.image;
  });

  app.post('/api/projects', function(req, res){
    var data = req.body.textData;
    var image = req.body.image;
    var imageFileName = req.body.imageFileName;

    
    // projects.saveProjectImageToFileSystem(imageFileName, image, function(){
    //   projects.saveProjectTextToDb(data);
    // });
  });

  app.post('/register', authentication.signup);
  app.post('/login' , authentication.login);
  app.get('/logout', authentication.logout);
  app.get('/isAuth', authentication.checkUser);
  app.get('/test', function(req, res){
    console.log('request session : ', req.session);
  })
  //default image response
  app.get('*', function(req, res) {
    res.send('what?');
  });


};

module.exports.setup = setup;

