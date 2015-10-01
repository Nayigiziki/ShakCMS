var mongoose = require('mongoose');
var ProjectModel = require('../db/db').projectModel;


var saveToDb = function(project){
  var newProject = new ProjectModel({projectTitle: project.title, projectDetails: project.details});
  newProject.save(function(err, newProj){
    if(err){
      console.log('err ' , err);
    } else {
      console.log('successfully saved Project ', newProj);
    }
  })
}

var getFromDb = function(projectTitle, cb){
  ProjectModel.findOne({ projectTitle: projectTitle }, function (err, proj) {
    if (err) {
      console.log('err ', err);
      cb(false);
    } else {
      console.log('user find result ', proj);
      cb(proj);
    }
  })
}

var deleteFromDb = function(category, projectTitle){
  ProjectModel.findOne({ projectTitle: projectTitle }).remove(function(err, obj){
    if(err){
      console.log('err ', err);
    } else {
      console.log('success');
    }
  })
}

var deleleDb = function(){
  // redis.flushall();
}

module.exports = {
  saveToDb : saveToDb,
  getFromDb : getFromDb,
  deleteFromDb : deleteFromDb,
  deleleDb : deleleDb
};




