// add controllers
myApp.controller('zillowCtrl', ['$scope',
  '$http',
  function($scope, $http) {

    $scope.events = {};
    $scope.zillowCall = function() {
       // call to zillow
      $http.get('/zillowapi').then(function(data) {
        console.log(data,"  THIS IS FRONT END");

      });
    };

  }
]);
