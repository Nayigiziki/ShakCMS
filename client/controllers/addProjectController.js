angular.module('shakApp.addProject', [])
.controller('addProjectController', function($scope, Server, $state, Cloudinary, $timeout, toastr){
    //"ProjectName-Discipline-Date"
    // cloudinary.cloudinary_js_config();
    $scope.imagePreloader = false;


    var data = {
      image : 'http://img.ffffound.com/static-data/assets/6/fb5f4b73f74d14b59b583f2d0fff8e374e541024_m.jpg',
      projectDescription :'I am the founder and current director of this project, overseeing all areas including research, graphic design, web design, social media presence, and performances.',
      projectTitle :'Shak',
      projectClient :'Joe Daddy',
      projectCollaborator :'Joe Daddy and Shak',
      projectDetails :'Tea time',
      projectUrl :'www.google.com',
      projectDiscipline : 'identity',
      projectYear : 2015
    };

    $scope.data = data;
    
    $scope.createProject = function(){
      console.log('creating project');

      var project = {
        projectDescription : $scope.data.projectDescription,
        projectTitle : $scope.data.projectTitle,
        projectClient : $scope.data.projectClient,
        projectCollaborator : $scope.data.projectCollaborator,
        projectDetails : $scope.data.projectDetails,
        projectUrl : $scope.data.projectUrl,
        projectDiscipline : $scope.data.projectDiscipline,
        projectImageUrl : $scope.data.projectImageUrl,
        projectYear : $scope.data.projectImageUrl
      }

      Server.post('createProject', project)
      .then(function(response){
        console.log(response);
      }, function(err){
        console.log('error ', err);

      })
    }


    $scope.uploadFiles = function(file, errFiles) { 
      $scope.data.file = file;
      console.log('file ', file);
      console.log('err ', errFiles);
    }

    $scope.uploadImgToCloudinary = function(){
      console.log('click');
      if(data.file) {
        Cloudinary.upload(data.file, data.projectTitle)
          .then(function (response) {
            console.log(response);
            $scope.data.projectImageUrl = response.data.secure_url;
            $scope.createProjectStatus = 'Create project';
            toastr.success('<iframe src="//giphy.com/embed/aQDknTwpx32aQ" width="570" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', 'Image Uploaded!', {allowHtml: true});
            $timeout(function(){
              $scope.imagePreloader = false;
            }, 5000);
            $scope.createProject();
          }, function (response) {
            $scope.imagePreloader = false;
            console.log('Error status: ' + response.status);
            $scope.createProjectStatus = 'Image upload Error, please try again';

          }, function (evt) {
            $scope.createProjectStatus = "loading";
            $scope.imagePreloader = true;
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });

      }
    }

    $scope.addProject = function(){
      //upload image
      //save project to db

    }


  })
.directive('myUpload', [ 'Upload', function (Upload) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      var reader = new FileReader();

      reader.onload = function (e) {
        scope.data.image = e.target.result;    
        scope.$apply();
      }

      elem.on('change', function() {
        reader.readAsDataURL(elem[0].files[0]);
      });
    }
  };
}]);
