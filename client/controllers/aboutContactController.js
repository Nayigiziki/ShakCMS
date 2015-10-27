angular.module('shakApp.aboutContact', [])
  .controller('aboutContactController', function($scope, Server, $state, State){
    var aboutData =  State.getAboutObj();
    var data = {};
    data.contact = State.getContactObj(); 
    data.links = aboutData.links;
    data.aboutDescription = aboutData.aboutContent;
    $scope.data = data;
  });