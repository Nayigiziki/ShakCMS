var mongoose = require('mongoose');
var ProjectModel = require('../db/db').projectModel;


var saveToDb = function(project, cb){
  var newProject = new ProjectModel({project: project});
  newProject.save(function(err, newProj){
    if(err){
      console.log('err ' , err);
    } else {
      console.log('successfully saved Project ');
    }
    cb(err, newProj);
  })
}

var getProjectFromDb = function(id, cb){
  ProjectModel.findOne({ _id: id }, function (err, proj) {
    if (err) {
      console.log('err ', err);
    } else {
      console.log('found project');
      console.log(proj);
    }
    cb(err, proj);
  })
}

var getAllProjectsFromDB = function(cb){
  ProjectModel.find({}, function (err, projs) {
    if (err) {
      console.log('err ', err);
      cb(false)
    } else {
      console.log('found project results ', projs);
      cb(projs);
    }
  })
}

var editProjectDb = function(id, projectObj, cb){
  ProjectModel.update({ _id: id }, { $set: { project: projectObj}}, function(err, proj){
    if(err){
      console.log('err ' , err);
    } else {
      console.log('successfully edited Project ');
    }
    cb(err, proj);
  });
}


var deleteProjectFromDb = function(id, cb){
  ProjectModel.findOne({ _id: id }).remove(function(err, obj){
    if(err){
      console.log('err ', err);
    } else {
      console.log('success');
    }
    cb(err, obj);
  })

}

var deleteAllProjectsFromDb = function(cb){
  ProjectModel.remove(function(err, obj){
    if(err){
      console.log('err ', err);
    } else {
      console.log('success');
    }
    cb(err, obj);
  })
}

module.exports = {
  saveToDb : saveToDb,
  getProjectFromDb : getProjectFromDb,
  getAllProjectsFromDB : getAllProjectsFromDB,
  editProjectDb : editProjectDb,
  deleteProjectFromDb : deleteProjectFromDb,
  deleteAllProjectsFromDb : deleteAllProjectsFromDb
};



