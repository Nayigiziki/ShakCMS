angular.module('shakApp.addProject', [])
.controller('addProjectController', function($scope, Server, $state, Cloudinary, $timeout, toastr, $stateParams){
    //"ProjectName-Discipline-Date"
    // cloudinary.cloudinary_js_config();

    var data = {
      image : 'http://img.ffffound.com/static-data/assets/6/fb5f4b73f74d14b59b583f2d0fff8e374e541024_m.jpg',
      projectDescription :'I am the founder and current director of this project, overseeing all areas including research, graphic design, web design, social media presence, and performances.',
      projectTitle :'Shak',
      projectClient :'Joe Daddy',
      projectCollaborator :'Joe Daddy and Shak',
      projectDetails :'Tea time',
      projectUrl :'www.google.com',
      projectDiscipline : 'identity',
      projectImageUrl : 'http://img.ffffound.com/static-data/assets/6/fb5f4b73f74d14b59b583f2d0fff8e374e541024_m.jpg'

    };

    $scope.data = data;
    
    $scope.createProject = function(){
      console.log('creating project');

      var project = {
        projectTitle : $scope.data.projectTitle,
        projectDescription : $scope.data.projectDescription,
        projectClient : $scope.data.projectClient,
        projectDiscipline : $scope.data.projectDiscipline,
        projectCollaborator : $scope.data.projectCollaborator,
        projectYear : $scope.data.projectYear,
        projectDetails : $scope.data.projectDetails,
        projectUrl : $scope.data.projectUrl,
        projectImageUrl : $scope.data.projectImageUrl
      }

      Server.post('createProject', project)
        .then(function(response){
          console.log(response);
          toastr.success('<iframe src="//giphy.com/embed/aQDknTwpx32aQ" width="570" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', 'Project Created!', {allowHtml: true});
          // toastr.success('Project Created');
        }, function(err){
          console.log('error ', err);
          toastr.success('Project failed to load');
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
        var uploadTitle = $scope.data.projectTitle + '-' + $scope.data.projectDiscipline;
        Cloudinary.upload(data.file, uploadTitle)
          .then(function (response) {
            console.log(response);
            $scope.data.projectImageUrl = response.data.secure_url;
            $scope.createProjectStatus = 'Create project';
            $scope.createProject();
          }, function (response) {
            console.log('Error status: ' + response.status);
            $scope.createProjectStatus = 'Image upload Error, please try again';

          }, function (evt) {
            $scope.createProjectStatus = "loading";
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });

      }
    }

  })
.directive('myUpload', [ 'Upload', function (Upload) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      var reader = new FileReader();

      reader.onload = function (e) {
        scope.data.projectImageUrl = e.target.result;    
        scope.$apply();
      }

      elem.on('change', function() {
        reader.readAsDataURL(elem[0].files[0]);
      });
    }
  };
}]);
