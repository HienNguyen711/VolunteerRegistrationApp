myApp = angular.module('myApp',
  ['ngRoute', 'firebase'])
  .constant('FIREBASE_URL', 'https://volunteerregis.firebaseio.com/');

//var appControllers = angular.module('appControllers', []);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller:  'MainController'
  })
  .when('/user', {
    templateUrl: 'views/user.html',
    controller:  'UserController'
  })

  .when('/login', {
    templateUrl: 'views/login.html',
    controller:  'RegistrationController'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller:  'RegistrationController'
  })
  .when('/directory', {
    templateUrl: 'views/directory.html',
    controller:  'DirectoryController'
  })
  .when('/event/:userId/:eventId', {
    templateUrl: 'views/event.volunteer.html',
    controller:  'EventController'
  })
  .when('/event/:userId/:eventId/edit', {
    templateUrl: 'views/event-edit.html',
    controller:  'EventController'
  })
  .when('/event/:userId/:eventId/edit/divisions', {
    templateUrl: 'views/edit-divisions.html',
    controller:  'EditorController'
  })

  .when('/signup/:userId/:eventId', {
    templateUrl: 'views/event-signup.html',
    controller:  'SignupController'
  })
  .otherwise({
      redirectTo: '/'
  });
}]);
