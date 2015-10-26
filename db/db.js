var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
  project : {
    projectTitle: String,
    projectDescription : String,
    projectClient: String,
    projectDiscipline: String,
    projectCollaborator: String,
    projectYear: Number,
    projectCreationDate: { type: Date, default: Date.now },
    projectDetails: String, 
    projectUrl: String,
    projectImageUrls: Array
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

