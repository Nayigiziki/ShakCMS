var authentication = require('./controllers/authentication');


var setup = function(app) {
  //need tests
  app.post('/api/register', authentication.signup);
  app.post('/api/login' , authentication.login);
  app.get('/api/logout', authentication.logout);
  app.get('/api/isAuth', authentication.checkUser);


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

  //default image response
  app.get('*', function(req, res) {
    res.send('what?');
  });


};

module.exports.setup = setup;

