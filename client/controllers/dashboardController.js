angular.module('shakApp.dashboard', [])
  .controller('dashboardController', function($scope, Server, $state, Auth){
    Auth.isAuth()
    .then(function(response){
      console.log(response);
      if(response.data.status === 'not logged in') {
        $state.go('login');
      }
    })

    var data = {};

    $scope.logout = function(){
      var url = 'logout';
      Server.get(url).then(function(response){
        console.log('logout resposne ', response);
        if(response.status === 200) {
          $state.go('login');
        }   
      })
    }

    $state.go('project');
  });