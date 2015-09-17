angular.module('shakApp.work', [])
  .controller('workController', function($scope, Server, $state){
    var data = {};

    $scope.register = function(){
      var url = 'register';
      var data = {
        username: $scope.data.user,
        password : $scope.data.password
      }
      
      $scope.data.user = '';
      $scope.data.password = '';
      console.log('registering');
      Server.post(url, data).then(function(response){
        console.log(response);
        if(response.status === 201) {
          $state.go('dashboard');
        } else {
          $scope.error = 'User name exists';
        }
      })

    }

    $scope.goToIdentity = function(){
      $state.go('dashboard.work.project')
    }


  });