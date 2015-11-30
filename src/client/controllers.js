// add controllers
myApp.controller('zillowCtrl', ['$scope',
  '$http',
  function($scope, $http) {

    $scope.events = {};
    $scope.zillowCall = function() {
       // call to zillow
       console.log("  WATCH THIS STEPHY");
      $http.get('/craigslist/scrape').then(function(response) {
        console.log(response,"  Steph claps");
        $scope.listings = response.data;
      });
    };

  }
]);
