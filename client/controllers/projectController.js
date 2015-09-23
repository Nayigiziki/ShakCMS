angular.module('shakApp.project', [])
  .controller('projectController', function($scope, Server, $state){
    var data = {
      image : 'http://img.ffffound.com/static-data/assets/6/6a1a61f79fe45a8be48872dc3b3d2ecdceae4995_m.jpg',
      projectDescription :'I am the founder and current director of this project, overseeing all areas including research, graphic design, web design, social media presence, and performances.',
      projectTitle :'Shak',
      projectClient :'Joe Daddy',
      projectCollaborator :'Joe Daddy and Shak',
      projectDetails :'Tea time',
      projectUrl :'www.google.com',
      projectDiscipline : 'identity'
    };

    $scope.data = data;
    
  });