angular.module('shakApp.listProjects', [])
.controller('listProjectsController', function($scope, $state, State, Server){

  if(State.getProjObj().data){
    $scope.projects = State.getProjObj().data;
  } else {
    Server.get('projects').then(function(dbProjects){
      console.log(dbProjects);
      $scope.projects = dbProjects.data.projects;
      State.getProjects();
    }, function(err){
      console.log(err);
    })
  }


  $scope.goToProj = function(project, key){
    var largestIndex = $scope.projects.length - 1;
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

    console.log('p ', prevKey);
    console.log('n ', nextKey);
    console.log($scope.projects);

    $state.transitionTo('editProject', {
      project: project, 
      prevProject : $scope.projects[prevKey],
      nextProject : $scope.projects[nextKey]
    });
  }

});