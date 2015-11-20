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
  'shakApp.editProject', 
  'shakApp.landingPage',
  'shakApp.aboutContact',
  'shakApp.nonAdminDashboard',
  'shakApp.editAboutContact',
  'ngFileUpload'
  ])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/nonAdminDashboard');

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
  .state('nonAdminDashboard', {
    url: '/nonAdminDashboard',
    templateUrl: 'views/nonAdminDashboard.html',
    controller : 'nonAdminDashboardController'
  })
  .state('addProject', {
    parent: 'dashboard',
    url: '/addProject',
    templateUrl: 'views/addProject.html',
    controller : 'addProjectController'
  })
  .state('editProject', {
    parent: 'dashboard',
    url: '/editProject',
    templateUrl: 'views/editProject.html',
    controller : 'editProjectController',
    params : {
      project: null,
      prevProject : null,
      nextProject : null,
    }
  })
  .state('work', {
    parent: 'nonAdminDashboard',
    url: '/work',
    templateUrl: 'views/work.html',
    controller : 'workController' 
  })
  .state('project', {
    parent: 'nonAdminDashboard',
    url: '/project',
    templateUrl: 'views/project.html',
    controller : 'projectController',
    params : {
      projectKey: null,
      prevProjectKey : null,
      nextProjectKey : null,
      largestKey: null,
      discipline : null
    }
  })
  .state('listProjects', {
    parent: 'dashboard',
    url: '/listProjects',
    templateUrl: 'views/listProjects.html',
    controller : 'listProjectsController'
  })
  .state('landingPage', {
    parent: 'nonAdminDashboard',
    url: '/landingPage',
    templateUrl: 'views/landingPage.html',
    controller : 'landingPageController'
  })
  .state('about', {
    parent: 'nonAdminDashboard',
    url: '/about',
    templateUrl: 'views/about.html',
    controller : 'aboutContactController'
  })
  .state('contact', {
    parent: 'nonAdminDashboard',
    url: '/contact',
    templateUrl: 'views/contact.html',
    controller : 'aboutContactController'
  })
  .state('editAbout', {
    parent: 'dashboard',
    url: '/editAbout',
    templateUrl: 'views/editAbout.html',
    controller : 'editAboutContactController'
  })
  .state('editContact', {
    parent: 'dashboard',
    url: '/editContact',
    templateUrl: 'views/editContact.html',
    controller : 'editAboutContactController'
  })


})
.factory('Server', function($http){
  var prodUrl = 'http://52.33.150.135/api/';
  var baseUrl = 'http://127.0.0.1:8080/api/';
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
  var protectedViews = {
    'addProject' : 'addProject',
    'listProjects' : 'listProjects',
    'dashboard' : 'dashboard',
    'editProject' : 'editProject'
  }
  var prodUrl = 'http://52.33.150.135/api/isAuth';
  var baseUrl = 'http://127.0.0.1:8080/api/isAuth';
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
  var getProtectedViews = function(){
    return protectedViews;
  }

  return {
    isAuth : isAuth,
    getProtectedViews : getProtectedViews
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
  var viewedProjectOnce = false;
  var about;
  var contact;
  var projects = {
    data : null,
    identity : [],
    interactive : [],
    print : [],
    direction : []
  };


  var sortDisciplines = function(){  
    _.each(projects.data, function(element, index){
        projects[element.project.projectDiscipline].push(element);
    });
    console.log('sorted projects ', projects);
  }

  var getProjects =  function(){
    Server.get('projects').then(function(dbProjects){
      timeStamp =  Date.now();
      projects.data = dbProjects.data.projects;
      sortDisciplines();
    }, function(err){
      console.log(err);
    });
  }

  var getProjObj = function(){
    return projects;
  }

  var getViewedProjectOnce = function(){
    var result = viewedProjectOnce;
    if(!viewedProjectOnce){
      viewedProjectOnce = true;
    }
    return result;
  }


  var getAbout = function(){
    Server.get('about').then(function(aboutObj){
      console.log('about obj ',aboutObj.data);
      if(aboutObj.data.about.length === 0 ){
        about = {
          aboutContent : 'Create new about page',
          links : []
        }
      } else {
        about = aboutObj.data.about[0];
      }
      
    }, function(err){
      console.log(err);
    })
  }

  var getAboutObj = function(){
    return about;
  }

  var getContact = function(){
    Server.get('contact').then(function(contactObj){
      console.log(contactObj.data);
      if(contactObj.data.contact.length === 0){
        contact = 'create contact page'
      } else {
        contact = contactObj.data.contact[0].contactContent;
      }
      
    }, function(err){
      console.log(err);
    })
  }

  var getContactObj = function(){
    return contact;
  }

  return {
    getProjects : getProjects,
    getProjObj : getProjObj,
    getViewedProjectOnce : getViewedProjectOnce,
    getAbout : getAbout,
    getAboutObj : getAboutObj,
    getContact : getContact,
    getContactObj : getContactObj
  }

})
.directive('autofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      });
    }
  }
}])
.run(function(Auth, $state, $rootScope, State){
  State.getProjects();
  State.getAbout();
  State.getContact();

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    var protectedViews = Auth.getProtectedViews();
    console.log('protected state state transition ', toState.name === protectedViews[toState.name]);
    
    if(toState.name === protectedViews[toState.name]){
      Auth.isAuth()
      .then(function(response){
        
        if(response.data.status === 'not logged in') {
          event.preventDefault();
          console.log('not logged in');
          $state.go('login');
        } 
      }).catch(function(err){
        event.preventDefault();
        $state.go('login');
      })
    }

  })

});

