var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
  projectTitle: String,
  projectDetails : {
    client: String,
    discipline: String,
    collaborators: String,
    year: Number,
    projectCreationDate: { type: Date, default: Date.now },
    details: String, 
    url: String,
    fileName: String
  }
});
var userSchema = new Schema({
  username: String,
  password: String,
});

module.exports = {
  projectModel : mongoose.model('Project', projectSchema),
  userModel : mongoose.model('User', userSchema)
};


