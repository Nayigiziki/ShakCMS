angular.module('shakApp.project', [])
  .controller('projectController', function($scope, Server, $state, $stateParams){
    

    var project = $stateParams.project.project;

    var data = {
      image : project.projectImageUrl,
      projectDescription : project.projectDescription,
      projectTitle : project.projectTitle,
      projectClient : project.projectClient,
      projectCollaborator : project.projectCollaborator,
      projectDetails : project.projectDetails,
      projectUrl : project.projectUrl,
      projectDiscipline : project.projectDiscipline,
      projectYear: project.projectYear
    };

    $scope.data = data;
    
  });