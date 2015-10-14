angular.module('shakApp.work', [])
  .controller('workController', function($scope, Server, $state, State){
    var data = {};
    $scope.projects =  State.getProjObj().data;
    var largestIndex = $scope.projects.length - 1;



    $scope.show = function(discipline){
      var tempProjectsObj  = State.getProjObj();
      $scope.projects = tempProjectsObj[discipline];
    }

    $scope.goToProj = function(project, key){
      var prevKey, nextKey;

      if(key === 0){
        prevKey = largestIndex;
        nextKey = key + 1;
      } else if(key === largestIndex){
        prevKey = key - 1;
        nextKey = 0
      } else {
        prevKey =  key - 1;
        nextKey = key + 1;
      }


      $state.transitionTo('project', {
        project: project, 
        prevProject : $scope.projects[prevKey],
        nextProject : $scope.projects[nextKey]
      });
    }

  });