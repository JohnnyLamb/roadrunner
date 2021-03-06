var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller:'zillowCtrl'
    }).when('/login', {
      templateUrl: 'partials/login.html',
      controller:'AuthCtrl'
    })
    .when('/logout', {
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
    })
    .when('/searchapi', {
      templateUrl: 'partials/searchapi.html',
      controller:'zillowCtrl'
    })
    .otherwise({redirectTo: '/'});
}]);

