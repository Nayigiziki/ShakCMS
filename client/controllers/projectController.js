angular.module('shakApp.project', [])
  .controller('projectController', function($scope, Server, $state, $stateParams, State){

    var projectIdentifierInformation = $stateParams;
    console.log(projectIdentifierInformation);
    if(!projectIdentifierInformation.projectKey === null){
        $state.go('work');
    } else {
      var projects = State.getProjObj();
      var project = projects[projectIdentifierInformation.discipline][projectIdentifierInformation.projectKey].project;
      var nextProject = projects[projectIdentifierInformation.discipline][projectIdentifierInformation.nextProjectKey].project;
      var prevProject = projects[projectIdentifierInformation.discipline][projectIdentifierInformation.prevProjectKey].project;
      // console.log('projects ', projects);
      // console.log('project identifier info ', projectIdentifierInformation);
      // console.log('project ', project);
      // console.log('next ', nextProject);
      // console.log('prev ', prevProject);

      var data = {
        projectImageUrl : project.projectImageUrl,
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

      //add transition
      $scope.data = data;
      // console.log($scope.data);

    var generateKeys = function(key, largestIndex, direction){
      var prevKey, nextKey;
      if(direction ==='next'){
        if(key === 0 && key !== largestIndex){
          prevKey = largestIndex;
          nextKey = key + 1;
        } else if(key === largestIndex && key !== 0){
          prevKey = key - 1;
          nextKey = 0;
        } else if(key === 0 && key === largestIndex){
          prevKey = 0;
          nextKey = 0;
        } else {
          prevKey =  key - 1;
          nextKey = key + 1;
        }
      } else {
        if(key === largestIndex && key !== 0){
          prevKey = largestIndex - 1;
          nextKey = 0;
        } else if(key === 0 && key !== largestIndex){
          prevKey = largestIndex;
          nextKey = 1;
        } else if(key === 0 && key === largestIndex){
          prevKey = 0;
          nextKey = 0;
        } else {
          prevKey =  key - 1;
          nextKey = key + 1;
        }        
      }
      var obj = {
        prevKey: prevKey,
        nextKey: nextKey
      };

      return obj;
    }

    $scope.transformImage = function(str){
      var transformStr = '/upload/w_342,h_204/'
      str = str.split('/upload/')
      return str[0] + transformStr + str[1];
    }

    $scope.goToNextProj = function(){
      var largestIndex = projects[projectIdentifierInformation.discipline].length - 1;
      var currentKey = projectIdentifierInformation.projectKey;
      var discipline = projectIdentifierInformation.discipline;
      var keys; 
      var key = currentKey + 1 >  largestIndex ?  0 : currentKey + 1;
      
      keys  = generateKeys(key, largestIndex);
      
      $state.transitionTo('project', {
        projectKey: key, 
        prevProjectKey : keys.prevKey,
        nextProjectKey : keys.nextKey,
        largestKey : largestIndex,
        discipline : discipline
      });

    }

    $scope.goToPrevProj = function(){
      var largestIndex = projects[projectIdentifierInformation.discipline].length - 1;
      var currentKey = projectIdentifierInformation.projectKey;
      var discipline = projectIdentifierInformation.discipline;
      var keys; 
      var key = currentKey - 1 < 0 ? largestIndex : currentKey - 1;
      
      keys  = generateKeys(key, largestIndex);
      
      $state.transitionTo('project', {
        projectKey: key, 
        prevProjectKey : keys.prevKey,
        nextProjectKey : keys.nextKey,
        largestKey : largestIndex,
        discipline : discipline
      });
    }
  }

  });