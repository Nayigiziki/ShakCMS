angular.module('shakApp.project', [])
  .controller('projectController', function($scope, Server, $state, $stateParams, State){

    var projectIdentifierInformation = $stateParams;
    console.log(projectIdentifierInformation);
    if(!projectIdentifierInformation.projectKey === null){
        $state.go('work');
    } else {
      if(!State.getViewedProjectOnce()){
        Materialize.toast('Click on the image to see more', 3000);
      }
      var projects = State.getProjObj();
      var project = projects[projectIdentifierInformation.discipline][projectIdentifierInformation.projectKey].project;
      var nextProject = projects[projectIdentifierInformation.discipline][projectIdentifierInformation.nextProjectKey].project;
      var prevProject = projects[projectIdentifierInformation.discipline][projectIdentifierInformation.prevProjectKey].project;


      var data = {
        projectImageUrls : project.projectImageUrls,
        projectImageUrl : project.projectImageUrls[0],
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
      console.log(data);
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

  })
.directive('shakCarouselProject', ['$timeout', function($timeout){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      console.log('attrs' , attrs);
      
      var index = null;
      elem.on('click', function(){
        console.log('clicked');
        var imgUrls = scope.data.projectImageUrls;
        console.log(imgUrls);
        
        if(imgUrls.length > 1){
          if(index ===  null){
            index = 1;
          } else if(!imgUrls[index + 1]) {
            index = 0;
          } else {
            index++;
          }
          scope.data.projectImageUrl = imgUrls[index];
          scope.$apply();
        }

      })

    }
  }
}]);