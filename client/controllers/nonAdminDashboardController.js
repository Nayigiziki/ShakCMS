angular.module('shakApp.nonAdminDashboard', [])
  .controller('nonAdminDashboardController', function($scope, Server, $state){
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
    
    $state.go('landingPage');
  });