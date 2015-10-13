angular.module('shakApp.project', [])
  .controller('projectController', function($scope, Server, $state, $stateParams){
    
    if(!$stateParams.project){
      $state.go('work');
    } else {
      var project = $stateParams.project.project;
      var prevProject = $stateParams.prevProject;
      var nextProject = $stateParams.nextProject;
    }

    console.log($stateParams);

    var data = {
      image : project.projectImageUrl,
      projectDescription : project.projectDescription,
      projectTitle : project.projectTitle,
      projectClient : project.projectClient,
      projectCollaborator : project.projectCollaborator,
      projectDetails : project.projectDetails,
      projectUrl : project.projectUrl,
      projectDiscipline : project.projectDiscipline,
      projectYear: project.projectYear,
      nextProject : nextProject,
      prevProject : prevProject
    };

    $scope.data = data;
    
  });