var authentication = require('./controllers/authentication');
var db = require('./controllers/dbController');


var setup = function(app) {
  //need tests
  app.post('/api/register', authentication.signup);
  app.post('/api/login' , authentication.login);
  app.get('/api/logout', authentication.logout);
  app.get('/api/isAuth', authentication.checkUser);

  //get projects
  app.get('/api/projects', function(req, res, next){
    db.getAllProjectsFromDB(function(data){
      if(!data){
        res.status(400).json({status: 'couldnt load the projects'})
      } else {
        res.status(200).json({status: 'successfully fetched the from the db', projects: data});
      }
    });
  });

  //create project
  app.post('/api/createProject', authentication.isAuth, function(req, res, next){
    var projectObj = req.body;
    db.saveToDb(projectObj, function(err, createdProj){
      if(!err){
        res.status(201).json({status: 'successfully added project to db', project: createdProj});
      } else {
        res.status(400).json({status: 'unsuccessfully added project to db'})
      }
    });
  });

  //delete projects
  app.post('/api/deleteProject', authentication.isAuth, function(req, res, next){
    db.deleteProjectFromDb(req.body.id, function(err, deletedProject){
      if(!err){
        console.log('edited Project ', deletedProject);
        res.status(200).json({status: 'successfully deleted project'})
      } else {
        console.log('err ', err);
        res.status(400).json({status: 'unsuccessfully updated project', err: err})
      }
    });
  });

  //update projects
  app.post('/api/editProject', function(req, res, next){
    db.editProjectDb(req.body.id, req.body.project, function(err, editedProject){
      if(!err){
        console.log('edited Project ', editedProject);
        res.status(200).json({status: 'successfully updated project', project: editedProject})
      } else {
        console.log('err ', err);
        res.status(400).json({status: 'unsuccessfully updated project', err: err})
      }
    });
  });

  //edit/create contact data
  app.post('/api/contact', function(req, res, next){
    db.editProjectDb(req.body.id, req.body.project, function(err, editedProject){
      if(!err){
        console.log('edited Project ', editedProject);
        res.status(200).json({status: 'successfully updated project', project: editedProject})
      } else {
        console.log('err ', err);
        res.status(400).json({status: 'unsuccessfully updated project', err: err})
      }
    });
  });



  //default response
  app.get('*', function(req, res) {
    res.send('what?');
  });


};

module.exports.setup = setup;

