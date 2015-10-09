angular.module('shakApp.addProject', [])
.controller('addProjectController', function($scope, Server, $state, Upload){
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
      projectDiscipline : 'identity'
    };

    $scope.data = data;
    
    $scope.createProject = function(){
      console.log('project');
      var url = 'project';
      Server.post(url, data).then(function(response){
        console.log(response);
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
        
        Upload.upload({
          url: 'https://api.cloudinary.com/v1_1/shak-com/image/upload',
          data: {
            file: data.file,
            api_key: 342745731731399,
            timestamp: Date.now(),
            public_id : data.projectTitle,
            upload_preset : 'u1r4ljrn'
          }
        })
        .then(function (response) {
            console.log('success response ', response);
            $scope.createProjectStatus = 'Image uploaded';
            $scope.imagePreloader = false;
        }, function (response) {
          $scope.imagePreloader = false;
          console.log('Error status: ' + response.status);
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