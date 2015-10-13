angular.module('shakApp.editProject', [])
.controller('editProjectController', function($scope, Server, $state, Cloudinary, $timeout, toastr, $stateParams){
    //"ProjectName-Discipline-Date"
    // cloudinary.cloudinary_js_config();
    console.log($stateParams.project);
    console.log('edit ctrl');
    if(!$stateParams.project){
      $state.go('listProjects');
    } else {
      var project = $stateParams.project.project;
      var prevProject = $stateParams.prevProject;
      var nextProject = $stateParams.nextProject;
      var data = {
        projectTitle : project.projectTitle,
        projectDescription : project.projectDescription,
        projectClient : project.projectClient,
        projectDiscipline : project.projectDiscipline,
        projectCollaborator : project.projectCollaborator,
        projectYear : project.projectYear,
        projectDetails : project.projectDetails,
        projectUrl : project.projectUrl,
        projectImageUrl : project.projectImageUrl,
        projectID : $stateParams.project._id
      };

      $scope.data = data;

  
        var image = new Image();
        image.setAttribute('crossOrigin', 'anonymous');

        image.onload = function () {
          var canvas = document.createElement('canvas');
          canvas.width = this.naturalWidth; 
          canvas.height = this.naturalHeight; 
          canvas.getContext('2d').drawImage(this, 0, 0);
          $scope.data.file = canvas.toDataURL('image/png');
        };

        image.src = project.projectImageUrl;




      $scope.editProject = function(){
        console.log('editing project');

        var obj = {
          id : data.projectID,
          project: {
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
        }

        Server.post('editProject', obj)
        .then(function(response){
          console.log(response);
          toastr.success('<iframe src="//giphy.com/embed/aQDknTwpx32aQ" width="570" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', 'Project Updated!', {allowHtml: true});
          // toastr.success('Project Created');
          $scope.createProjectStatus = 'Edit project';
        }, function(err){
          console.log('error ', err);
          toastr.success('Project failed to update');
        })
      }

      $scope.uploadFiles = function(file, errFiles) { 
        $scope.data.file = file;
        console.log('file ', file);
        console.log('err ', errFiles);
      }

      $scope.uploadImgToCloudinary = function(id){
        console.log('click');
        if(data.file) {
          var timeStamp = new Date();
          timeStamp =  timeStamp.toString();
          var uploadTitle = $scope.data.projectTitle + '-' + $scope.data.projectDiscipline + '-' + timeStamp;
          Cloudinary.upload($scope.data.file, uploadTitle)
          .then(function (response) {
            console.log(response);
            $scope.data.projectImageUrl = response.data.secure_url;
            $scope.editProject();
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
