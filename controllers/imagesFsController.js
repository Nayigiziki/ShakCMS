var fs = require('fs');

var basePath = __dirname + '/../images/';

var saveImageToFs = function(fileName, imagedata, cb){
  fs.writeFile(basePath + fileName, imagedata, 'binary', function(err){
      cb(err)
  })
}

var retrieveImageFromFs = function(fileName, cb){
  fs.readFile(fileName, function (err, data) {
    if (err) throw err;
    cb(data);
  });
}

var retrieveFileNames = function(cb){
  fs.readdir(basePath, function(err, files){
    cb(files);
  })
}

var deleteImage = function(fileName){
  fs.unlink(basePath + fileName);
}


module.exports = {
  saveImageToFs : saveImageToFs,
  retrieveImageFromFs : retrieveImageFromFs,
  retrieveFileNames : retrieveFileNames,
  deleteImage : deleteImage
};




