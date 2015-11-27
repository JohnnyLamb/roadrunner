// add controllers
myApp.controller('zillowCtrl', ['$scope',
  '$http',
  function($scope, $http) {

    $scope.events = {};
    $scope.zillowCall = function() {
       // call to zillow
       console.log("  THIS IS before api call");
      $http.get('/zillowapi/test').then(function(response) {
        console.log(response,"  THIS IS FRONT END");

      });
    };

  }
]);
