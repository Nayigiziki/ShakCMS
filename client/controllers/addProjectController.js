angular.module('shakApp.addProject', [])
.controller('addProjectController', function($scope, Server, $state){
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





    $scope.uploadFile = function(files) {
      var fd = new FormData();
      var viewReader = new FileReader();
        //Take the first selected file
        viewReader.onload = function(e) {
          var dataURL = viewReader.result;
          $scope.uploadFile = dataURL;
          $scope.$apply();
        }

        viewReader.readAsDataURL(files[0]);


// http://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api
    };


})
.directive('myUpload', [function () {
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