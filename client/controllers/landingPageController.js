angular.module('shakApp.landingPage', [])
  .controller('landingPageController', function($scope, Server, $state, toastr){
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

    toastr.success('Welcome to shakeil.com');
  });