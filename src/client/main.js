var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    }).when('/login', {
      templateUrl: 'partials/login.html',
    })
    .when('/logout', {
    })
    .when('/register', {
      templateUrl: 'partials/register.html',

    })
    .otherwise({redirectTo: '/'});
}]);
