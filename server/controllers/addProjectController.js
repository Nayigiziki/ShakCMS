var Redis = require('ioredis'),
    redis = new Redis(),
    stringify = require('node-stringify');

//"ProjectName-Discipline-Date"
//save to db
//save to fs


var saveProjectToDb = function(project){
  redis.hset('projects', project.title, JSON.stringify(project.projectDetails));
}
var getProjectFromDb = function(projectTitle, cb){
    redis.hget('projects', projectTitle, function(err, result){
    if(err){
      console.log('err ', err);
      cb(false);
    } else {
      cb(result);
    }
  })
}

var deleteProjectFromDb = function(projectTitle){
  redis.hdel('projects', projectTitle);
}

var deleleDb = function(){
  redis.flushall();
}


module.exports = {
  saveProjectToDb : saveProjectToDb,
  getProjectFromDb : getProjectFromDb,
  deleteProjectFromDb : deleteProjectFromDb,
  deleleDb : deleleDb
};




