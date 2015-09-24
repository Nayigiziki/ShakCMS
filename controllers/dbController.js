var Redis = require('ioredis'),
    redis = new Redis(),
    stringify = require('node-stringify');

//"ProjectName-Discipline-Date"
//save to db
//save to fs


var saveToDb = function(category , project){
  redis.hset(category, project.title, JSON.stringify(project.projectDetails));
}
var getFromDb = function(category, projectTitle, cb){
    redis.hget(category, projectTitle, function(err, result){
    if(err){
      console.log('err ', err);
      cb(false);
    } else {
      cb(result);
    }
  })
}

var deleteFromDb = function(category, projectTitle){
  redis.hdel(category, projectTitle);
}

var deleleDb = function(){
  redis.flushall();
}



module.exports = {
  saveToDb : saveToDb,
  getFromDb : getFromDb,
  deleteFromDb : deleteFromDb,
  deleleDb : deleleDb
};




