angular.module('shakApp.editAboutContact', [])
  .controller('editAboutContactController', function($scope, Server, $state, toastr){
    var data = {};
    data.contact = 'chyeah';
    // data.links = {
    //   Resumé : 'https://www.dropbox.com/s/n5wnlnudgs1m7hc/s_greeley_resume.pdf?dl=0',
    //   instagram : 'https://instagram.com/shakeilg/',
    //   tumblr : 'http://shakeilg.tumblr.com/',
    //   linkedIn : 'https://www.linkedin.com/in/shakeil',
    //   SoundCloud : 'https://soundcloud.com/shakibobo',
    //   Behance : 'https://www.behance.net/shakeil'
    // }    
    data.aboutDescription = 'text text text';

    $scope.data = data;

    $scope.createLink = function(){
      var text = $scope.data.text;
      var data = {
        text : $scope.data.link
      };


    }

    $scope.saveToDb = function(){
      Server.post('contact')
        .then(function(response){

        }, function(err){

        });
    }
    // toastr.success('Welcome to shakeil.com');
  });