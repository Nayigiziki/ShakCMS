angular.module('shakApp.login', [])
  .controller('loginController', function($scope, Server, $state){
    var data = {};

    $scope.login = function(){
      console.log('login');
      var url = 'login';
      var data = {
        username: $scope.data.user,
        password : $scope.data.password
      }

      $scope.data.user = '';
      $scope.data.password = '';

      Server.post(url, data).then(function(response){
        console.log(response);
        if(response.status === 201) {
          $state.go('dashboard');
        } else {
          $scope.error = 'User or Password invalid'
        }
      })
    }

    $scope.goToRegister = function(){
      $state.go('register');
    }
  });