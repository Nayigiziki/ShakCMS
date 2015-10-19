angular.module('shakApp.aboutContact', [])
  .controller('aboutContactController', function($scope, Server, $state, toastr){
    var data = {};
    data.contact = 'chyeah';
    $scope.data = data;

    $scope.saveToDb = function(){
      Server.post('contact')
        .then(function(response){

        }, function(err){

        });
    }
    // toastr.success('Welcome to shakeil.com');
  });