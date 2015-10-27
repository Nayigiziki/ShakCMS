angular.module('shakApp.editAboutContact', [])
  .controller('editAboutContactController', function($scope, Server, $state, toastr, State){
    
    var aboutData =  State.getAboutObj();
    var data = {};
    data.contact = State.getContactObj(); 
    data.links = aboutData.links;
    data.aboutDescription = aboutData.aboutContent;

    $scope.data = data;

    $scope.createLink = function(){
      var link = {
        name : $scope.data.text,
        url : $scope.data.link
      };
    
      $scope.data.text = '';
      $scope.data.link = '';
      data.links.push(link);
    }

    $scope.deleteLink = function(index){
      data.links.splice(index, 1);
    }
 

    $scope.saveAboutToDb = function(){
      var about = {
        links : data.links,
        aboutContent : data.aboutDescription
      };
      Materialize.toast('About Page updates processing...', 3000);
      Server.post('about', about)
        .then(function(response){
          Materialize.toast('About Page sucessfully updateed!', 3000);
          console.log(response);
        }, function(err){
          console.log('err ', err);
        });
    }

    $scope.createContact = function(){
      var contactData = {
        contactContent : data.contact
      }
      Materialize.toast('Contact Page updates processing...', 3000);
      Server.post('contact', contactData)
        .then(function(response){
          Materialize.toast('Contact Page sucessfully updateed!', 3000);
          console.log(response);
        }, function(err){
          console.log('err ', err);
        });
    }


  });