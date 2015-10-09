var expect = require('chai').expect,
request = require('superagent'),
express = require('express'),
Redis = require('ioredis'),
images = require('../controllers/imagesFsController'),
projectCtrl = require('../controllers/dbController'),
redis = new Redis(),
stringify = require('node-stringify');



describe('Add Project Controller', function() {
  var app = express();
  

  describe('adding a project ', function () {

    afterEach(function() {
      images.retrieveFileNames(function(filesArr){
        filesArr.forEach(function(file){
          images.deleteImage(file);
        })
      })
    });

    describe('adding an image to the filesystem', function () {
      it('should save an image to the database', function (done) {
        images.retrieveImageFromFs(__dirname + '/testAssets/IMG_0064.tif', function(file){
          images.saveImageToFs('test.tiff', file, function(err){
            if(!err){
              expect(!!err).to.equal(false);
              done();
            } else{
              console.log('err', err);
            }
          })
        });
      });

    });

    describe('adding project details to the database', function () {

      var time = new Date();
      time = time.toUTCString().split(' ');
      year = time[3];
      time = time.splice(0,4);
      time = time.join('~');

      var project = {
        title : 'ProjectShak',
        projectDetails: {
          client : 'joe',
          discipline : 'identity',
          collaborators : 'joe',
          year : year,
          time : time,
          details : 'lorem ipsum',
          specs: 'www.google.com',
          fileName :'ProjectShak-'+'Discipline-'+time
        }
      }

      var project2 = {
        title : 'ProjectShak',
        projectDetails: {
          client : 'joe Daddy',
          discipline : 'identity',
          collaborators : 'joe',
          year : year,
          time : time,
          details : 'lorem ipsum',
          specs: 'www.google.com',
          fileName :'ProjectShak-'+'Discipline-'+time
        }
      }

      var category = 'projects';

    it('should add project details to the database', function (done) {
      var projectStr = JSON.stringify(project.projectDetails);
      projectCtrl.saveToDb(category, project);
      projectCtrl.getFromDb(category, project.title, function(projectDb){
        if(!!projectDb){
          expect(projectDb).to.equal(projectStr);
          done();
        } else {
          console.log('redis didnt work');
          expect(true).to.equal(false);
          done();
        }
      })
    });

    it('should overwrite existing projects', function (done) {
      var initialProject = JSON.stringify(project.projectDetails);
      var overwrittenProject = JSON.stringify(project2.projectDetails);
      projectCtrl.saveToDb(category, project);
      projectCtrl.saveToDb(category, project2);
      projectCtrl.getFromDb(category, project.title, function(projectDb){
        if(!!projectDb){
          expect(projectDb).to.equal(overwrittenProject);
          done();
        } else {
          console.log('redis didnt work');
          expect(true).to.equal(false);
          done();
        }
      })
    });

    it('should delete project', function (done) {
      var projectStr = JSON.stringify(project.projectDetails);
      projectCtrl.deleleDb();
      projectCtrl.saveToDb(category, project);
      projectCtrl.getFromDb(category, project.title, function(projectDb){
        if(!!projectDb){
          expect(projectDb).to.equal(projectStr);
          projectCtrl.deleteFromDb(category, project.title);
          projectCtrl.getFromDb(category, project.title, function(projectDb){
            if(!!projectDb){
              expect(true).to.equal(false);
              done();
            } else {
              expect(projectDb).to.equal(null);
              done();
            }
          })
        } else {
          console.log('redis didnt work');
          expect(true).to.equal(false);
          done();
        }
      })

    });

    });

describe('project + project image saved to both filesystem and database', function () {

  xit('each project in the database should have an image in the filesystem', function (done) {

  });

  xit('each image in the filesystem should have a project in the database', function (done) {

  });


});

});




});