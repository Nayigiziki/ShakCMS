var myApp = angular.module('shakApp', 
  [
  'ui.router',
  'shakApp.login',
  'shakApp.register',
  'shakApp.dashboard',
  'shakApp.addProject',
  'shakApp.work',
  'shakApp.project',
  'shakApp.listProjects', 
  'ngFileUpload',
  'toastr'
  ])
.config(function($stateProvider, $urlRouterProvider, toastrConfig) {


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
  .state('addProject', {
    parent: 'dashboard',
    url: '/addProject',
    templateUrl: 'views/addProject.html',
    controller : 'addProjectController'
  })
  .state('work', {
    parent: 'dashboard',
    url: '/work',
    templateUrl: 'views/work.html',
    controller : 'workController' 

  })
  .state('project', {
    parent: 'dashboard',
    url: '/project',
    templateUrl: 'views/project.html',
    controller : 'projectController',
    params : {project: null}
  })
  .state('about', {
    parent: 'dashboard',
    url: '/about',
    templateUrl: 'views/about.html'
  })
  .state('contact', {
    parent: 'dashboard',
    url: '/contact',
    templateUrl: 'views/contact.html'
  })
  .state('listProjects', {
    parent: 'dashboard',
    url: '/listProjects',
    templateUrl: 'views/listProjects.html',
    controller : 'listProjectsController'
  })

  angular.extend(toastrConfig, {
    autoDismiss: false,
    containerId: 'toast-container',
    maxOpened: 0,    
    newestOnTop: true,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body',
    timeOut : 5000,
    progressBar: true,
    tapToDismiss: true,
  });

})
.factory('Server', function($http){
  var baseUrl = 'http://127.0.0.1:3001/api/';
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
  var baseUrl = 'http://127.0.0.1:3001/api/isAuth';
  var isAuth = function(){
    return $http.get(baseUrl)
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
    isAuth : isAuth
  }

})
.factory('Cloudinary', function($http, $state, Upload){
  var baseUrl = 'https://api.cloudinary.com/v1_1/shak-com/image/upload';
  var upload = function(file, projectTitle){
    return Upload.upload({
              url: baseUrl,
              data: {
                file: file,
                api_key: 342745731731399,
                timestamp: Date.now(),
                public_id : projectTitle,
                upload_preset : 'u1r4ljrn'
              }
            })
  }


  return {
    upload : upload
  }

})
.factory('State', function($http, $state, Server){
 var projects;
 var getProjects =  function(){
    Server.get('projects').then(function(dbProjects){
      projects = dbProjects.data.projects;
    }, function(err){
      console.log(err);
    })
 }

var getProjObj = function(){
  return projects;
}

  return {
    getProjects : getProjects,
    getProjObj : getProjObj
  }

})
.run(function(Auth, $state, $rootScope, State){
  Auth.isAuth()
  .then(function(response){
    console.log(response);
    if(response.data.status === 'not logged in') {
      $state.go('login');
    } else {
      $state.go('dashboard');
      State.getProjects();
    }
  }).catch(function(err){
    $state.go('login');
  })
});

