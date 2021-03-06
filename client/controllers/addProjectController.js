angular.module('shakApp.addProject', [])
.controller('addProjectController', function($scope, Server, $state, Cloudinary, $timeout, $stateParams, State){
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
    
    $scope.createProject = function(urls){
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
        projectImageUrls : urls
      }

      Server.post('createProject', project)
      .then(function(response){
        console.log(response);
        Materialize.toast('Project Created!', 3000);
        $scope.createProjectStatus = 'Project Created';
        $timeout(function(){
          $state.go('listProjects');
        }, 1500);
      }, function(err){
        console.log('error ', err);
        Materialize.toast('Project failed to load', 3000);
      })
    }

    $scope.uploadFiles = function(files, errFiles) { 
      $scope.data.files = files;
      console.log('file ', files);
      console.log('err ', errFiles);
    }

    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 5; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));        
      }

      return text;
    }
    
    function sortImageDataUrls(){
      var temp;
      if($scope.data.firstImage && $scope.data.firstImage != 0){
        temp = $scope.data.imageDataUrls.splice($scope.data.firstImage, 1);
        $scope.data.imageDataUrls = temp.concat($scope.data.imageDataUrls);
      }
    } 

    $scope.uploadImgToCloudinary = function(){
      console.log('click');
      console.log('files ', data.files);
      sortImageDataUrls();
      if($scope.data.imageDataUrls) {        
        var imageCount = $scope.data.imageDataUrls.length;
        var urls = [];
        var i = 0;
        var count = 0;

        angular.forEach($scope.data.imageDataUrls, function(file, index) {
          var uploadTitle = $scope.data.projectTitle + '-' + $scope.data.projectDiscipline + '-' + makeid();
          Cloudinary.upload(file.file, uploadTitle)
          .then(function (response) {
            console.log(response);

            $scope.data.projectImageUrl = response.data.secure_url;
            count++;
            urls[index] = response.data.secure_url;

            $scope.createProjectStatus = 'Create project';
            console.log('uploaded count ', urls);
            if(imageCount === count){
              console.log('uploaded all images');
              $scope.createProject(urls);
            }
          }, function (response) {
            console.log('Error status: ', response.toString());
            $scope.createProjectStatus = 'Image upload Error, please try again';

          }, function (evt) {
            $scope.createProjectStatus = "loading";
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });

        })
      }
    }
  })
.directive('myUpload', [ 'Upload', function (Upload, $timeout) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      var reader = new FileReader();
      var imageCount = 0;
      var index = 0;

      elem.on('change', function() {
        var imageDataUrls = [];
        imageCount = elem[0].files.length;
        angular.forEach(elem[0].files, function(file){
          var reader = new FileReader();
          
          (function (imageFile){
            reader.onload = function (e) {
              imageDataUrls.push({
                file: imageFile,
                url : e.target.result
              });
              
              if(imageDataUrls.length === imageCount){
                scope.data.projectImageUrl = imageDataUrls[0].url;    
                scope.data.imageDataUrls = imageDataUrls;
                angular.forEach(imageDataUrls, function(dataUrl){
                  dataUrl['orderRank'] = null;
                });
                console.log('img data urls arr ', scope.data.imageDataUrls);
                scope.$apply();  
              }
            }            
          })(file);

          reader.readAsDataURL(file);
        })

      });
    }
  };
}])
.directive('shakCarousel', ['$timeout', function($timeout){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      console.log('attrs' , attrs);
      var index = null;
      elem.on('click', function(){
        console.log('clicked');
        var imgUrls = scope.data.imageDataUrls;
        console.log(imgUrls);
        
        if(imgUrls.length > 1){  

          if(index ===  null){
            index = 1;
          } else if(!imgUrls[index + 1]) {
            index = 0;
          } else {
            index++;
          }
          
          imgUrls[index].orderRank = index;
          scope.data['orderRank'] = index === 0 ? '0' : index;
          scope.data.projectImageUrl = imgUrls[index].url;
          scope.$apply();
        }
      })
    }
  }
}])
.directive('pickFirstImage', function(){
  return {
    restrict: 'E',
    templateUrl: '../views/pickFirstImage.html',
    link: function(scope, elem, attrs){
      elem.on('click', function(e){
        e.preventDefault();
        scope.data.firstImage = scope.data.orderRank;
        Materialize.toast('This image will now be shown first', 3000);
        scope.$apply();
      })
    }
  }
});


