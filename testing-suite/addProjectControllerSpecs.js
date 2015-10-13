var expect = require('chai').expect,
request = require('superagent'),
express = require('express'),
mongoose = require('mongoose'),
projectCtrl = require('../controllers/dbController'),
stringify = require('node-stringify');



describe('Add Project Controller', function() {
  var app = express();
  var dbUrl = 'mongodb://localhost/shak';
  mongoose.connect(dbUrl);
  
  describe('adding project details to the database', function () {
    afterEach(function() {
      projectCtrl.deleteAllProjectsFromDb(function(err, obj){
        if(err){
          console.log(err);
        }
      })
    });

    var project1 = {
      projectTitle : 'test',
      projectDescription : 'test',
      projectClient : 'test',
      projectDiscipline : 'test',
      projectCollaborator : 'test',
      projectYear : 2015,
      projectDetails : 'test',
      projectUrl : 'test',
      projectImageUrl : 'test'
    };

    var project2 = {
      projectTitle : 'test2',
      projectDescription : 'test',
      projectClient : 'test',
      projectDiscipline : 'test',
      projectCollaborator : 'test',
      projectYear : 2015,
      projectDetails : 'test',
      projectUrl : 'test',
      projectImageUrl : 'test'
    };

    var project2 = {
      projectTitle : 'test2',
      projectDescription : 'test',
      projectClient : 'test',
      projectDiscipline : 'test',
      projectCollaborator : 'test',
      projectYear : 2015,
      projectDetails : 'test',
      projectUrl : 'test',
      projectImageUrl : 'test'
    };


    it('should add project details to the database', function (done) {
      projectCtrl.saveToDb(project1, function(err, newProj){
        projectCtrl.getProjectFromDb(newProj._id, function(err, fetchedProj){
          if(!err){
            expect(JSON.stringify(fetchedProj.project)).to.equal(JSON.stringify(newProj.project));
            done();
          } else {
            console.log('db failed to get work');
            expect(true).to.equal(false);
            done();
          }
        });
      });
    });

    it('should overwrite existing projects', function (done) {
      projectCtrl.saveToDb(project1, function(err, newProj){
        projectCtrl.editProjectDb(newProj._id, project2,  function(err, editedProj){
          projectCtrl.getProjectFromDb(newProj._id, function(err, fetchedProj){
            if(!err){
              console.log(fetchedProj);
              console.log(err);
              expect(fetchedProj.project.projectTitle).to.equal(project2.projectTitle);
              expect(fetchedProj.project.projectTitle).to.not.equal(project1.projectTitle);
              done();
            } else {
              console.log('db failed to get work');
              expect(true).to.equal(false);
              done();
            }
          });
        });
      });
    });

  });

});