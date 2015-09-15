var myApp = angular.module('shakApp', 
  [
    'ui.router',
    'shakApp.login',
    'shakApp.register',
    'shakApp.dashboard',
    'shakApp.addProject'
  ])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'loginController'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'views/register.html',
    controller : 'registerController'
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'views/dashboard.html',
    controller : 'dashboardController'
  })
  .state('dashboard.addProject', {
    url: '/addProject',
    templateUrl: 'views/addProject.html',
    controller : 'addProjectController'
  })

})
.factory('Server', function($http){
  var baseUrl = 'http://127.0.0.1:3001/';
  var post = function(url, data){
    return $http.post(baseUrl + url, data)
    .then(function(response) {
        // this callback will be called asynchronously
        // when the response is available
        return response;
      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        return response;
      });

  }

  var get = function(url) {
    return $http.get(baseUrl + url)
    .then(function(response) {
        // this callback will be called asynchronously
        // when the response is available
        return response;
      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        return response;
      });
  }

  return {
    get : get,
    post : post
  }
})
.factory('Auth', function($http, $state){
  var baseUrl = 'http://127.0.0.1:3001/isAuth';
  var isAuth = function(){
    return $http.get(baseUrl)
    .then(function(response) {
        // this callback will be called asynchronously
        // when the response is available
        if(!response.data) {
          $state.go('login');
        };
      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        return response;
      });
  }

  return {
    isAuth : isAuth
  }

})
