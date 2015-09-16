var Redis = require('ioredis'),
    redis = new Redis(),
    fs = require('fs');


//save to db
//save to fs

var saveImageToFs = function(){
   fs.writeFile('logo.png', imagedata, 'binary', function(err){
            if (err) throw err
            console.log('File saved.')
        })
    })
}


module.exports = {
  
};




