angular.module('shakApp.work', [])
  .controller('workController', function($scope, Server, $state, State){
    var data = {
      discipline : 'data'
    };
    var projectObj =  State.getProjObj();
    $scope.projects =  State.getProjObj().data;

    $scope.show = function(discipline){
      var tempProjectsObj  = State.getProjObj();
      $scope.projects = tempProjectsObj[discipline];
      data.discipline = discipline;
    }

    $scope.goToProj = function(key){
      var largestIndex = projectObj[data.discipline].length - 1;
      var prevKey, nextKey;

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

      $state.transitionTo('project', {
        projectKey: key, 
        prevProjectKey : prevKey,
        nextProjectKey : nextKey,
        largestKey : largestIndex,
        discipline : data.discipline
      });
    }

  });