var mongoose = require('mongoose');
var ProjectModel = require('../db/db').projectModel;


var saveToDb = function(project, cb){

  var newProject = new ProjectModel({project: project});
  
  newProject.save(function(err, newProj){
    if(err){
      console.log('err ' , err);
    } else {
      console.log('successfully saved Project ', newProj);
    }
    cb(err, newProj);
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


var editDb = function(id, projectObj, cb){
  ProjectModel.update({ _id: id }, { $set: { project: projectObj}}, function(err, proj){
    if(err){
      console.log('err ' , err);
    } else {
      console.log('successfully saved Project ', proj);
    }
    cb(err, proj);
  });
}

var getFromDb = function(projectTitle, cb){
  ProjectModel.find({}, function (err, proj) {
    if (err) {
      console.log('err ', err);
      cb(false);
    } else {
      console.log('user find result ', proj);
      cb(proj);
    }
  })
}

var getAllProjectsFromDB = function(cb){
  ProjectModel.find({}, function (err, proj) {
    if (err) {
      console.log('err ', err);
      cb(false)
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
  deleleDb : deleleDb,
  getAllProjectsFromDB : getAllProjectsFromDB
};



