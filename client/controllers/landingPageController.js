angular.module('shakApp.landingPage', [])
  .controller('landingPageController', function($scope, Server, $state){
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

    Materialize.toast('Welcome to shakeil.com', 1000000);

  });