angular.module('shakApp.project', [])
  .controller('projectController', function($scope, Server, $state, $stateParams){
    
    if(!$stateParams.project){
      $state.go('work');
    } else {
      var project = $stateParams.project.project;
      var prevProject = $stateParams.prevProject;
      var nextProject = $stateParams.nextProject;
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
        nextProject : $stateParams.nextproject,
        prevProject : $stateParams.prevProject
      };
      //add transition
      console.log('stateParams ', $stateParams);
      $scope.data = data;
    }

    $scope.transformImage = function(str){
      var transformStr = '/upload/w_342,h_204/'
      console.log(str);
      // str = str.project.projectImageUrl;
      return str[0] + transformStr + str[1];
    }

    $scope.goToNextProj = function(){

    }
    
  });