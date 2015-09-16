angular.module('shakApp.addProject', [])
  .controller('addProjectController', function($scope, Server, $state){
    //"ProjectName-Discipline-Date"

    var data = {};

    $scope.createProject = function(){
      console.log('project');
      var url = 'project';


      Server.post(url, data).then(function(response){
        console.log(response);
      })
    }

  });