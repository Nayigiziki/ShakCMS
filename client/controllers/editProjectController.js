angular.module('shakApp.editProject', [])
.controller('editProjectController', function($scope, Server, $state, Cloudinary, $timeout, $stateParams, State){
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
        projectImageUrl : project.projectImageUrls[0],
        projectID : $stateParams.project._id,
        projectImageUrls : project.projectImageUrls
      };

      $scope.data = data;

      (function createImgFiles (urls) {
        var dataUrls = [];
        var rank = 0;
        var urlCount = urls.length;

        angular.forEach(urls, function(url) {
          var image = new Image();
          image.setAttribute('crossOrigin', 'anonymous');

          image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth; 
            canvas.height = this.naturalHeight; 
            canvas.getContext('2d').drawImage(this, 0, 0);
            dataUrls.push({
              file: canvas.toDataURL('image/png'),
              url : this.src,
              rank : rank++
            });
            
            if (dataUrls.length === urlCount) {
              console.log('dataUrls ', dataUrls);
              $scope.data.imageDataUrls = dataUrls;
            }
          }

          image.src = url;  
        });
      })(project.projectImageUrls);



      $scope.deleteProject = function(){
        Server.post('deleteProject', {id: data.projectID}).then(function(response){
          console.log('response ', response);
          $scope.deleteProjectStatus = 'Project Deleted';
          Materialize.toast('Successfully deleted the project', 3000);
          $timeout(function(){
            $state.go('listProjects');
          }, 1500);
        }, function(err){
          console.log('err ', err);
        });
      };

      $scope.editProject = function(urls){
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
            projectImageUrls : urls
          }
        }

        Server.post('editProject', obj)
        .then(function(response){
          console.log(response);
          Materialize.toast('Project Updated!', 3000);
          $scope.editProjectStatus = 'Project Edited';
          $timeout(function(){
            $state.go('listProjects');
          }, 1500);
          
        }, function(err){
          console.log('error ', err);
          Materialize.toast('Project failed to update', 3000);
        })
      }

      $scope.uploadFiles = function(file, errFiles) { 
        $scope.data.file = file;
        console.log('file ', file);
        console.log('err ', errFiles);
      }

      $scope.uploadImgToCloudinary = function(id){
        console.log('click');
        if($scope.data.imageDataUrls) {
          var imageCount = $scope.data.imageDataUrls.length;
          var urls = [];
          var i = 0;

          angular.forEach($scope.data.imageDataUrls, function(file) { 
            var uploadTitle = $scope.data.projectTitle + '-' + $scope.data.projectDiscipline + '-' + i++;
            Cloudinary.upload(file.file, uploadTitle)
            .then(function (response) {
              $scope.data.projectImageUrl = response.data.secure_url;
              urls.push(response.data.secure_url)
              console.log('uploaded count ', urls.length);
              if(imageCount === urls.length){
                $scope.createProjectStatus = 'Edit project';
                console.log('uploaded all images');
                $scope.editProject(urls);
              }
            }, function (response) {
              console.log('Error status: ' + response.status);
              $scope.createProjectStatus = 'Image upload Error, please try again';

            }, function (evt) {
              $scope.createProjectStatus = "loading";
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
          });
        }
        //toast something to user

      }

    }


  });
