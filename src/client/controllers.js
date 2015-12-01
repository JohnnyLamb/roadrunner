// add controllers
myApp.controller('zillowCtrl', ['$scope',
  '$http',
  // THIS FUNCTION SENDS SEARCH PARAMS TO THE SCRAPING ROUTE.
  function($scope, $http) {
    $scope.events = {};
    $scope.zillowCall = function() {
      var payload = {
       "location" : $scope.location.toUpperCase(),
       "minPrice" : $scope.minPrice,
       "maxPrice" : $scope.maxPrice
      };
      console.log(payload);
      console.log("  WATCH THIS STEPHY");
      $http.post('/scrapeZillow/scrape/',payload).then(function(response) {
        console.log(response,"  Steph claps");
        $scope.listings = response.data;
      });
    };
    $scope.selectListingForZillowCall = function(listing){

      listing = listing.split(' ');
      var zip =listing[listing.length-1];
        zip = zip.replace(/\D/g,'');
      // console.log(listing.length[];
      var payload = {
       "address" : listing[0]+" " +listing[1]+" "+listing[2]+" "+listing[3]+" ",
       "citystatezip":zip
      };

      console.log(payload);
      $http.post('/zillowapi/callApi',payload).then(function(response) {
        console.log(response,"  Steph claps again");
        // $scope.listings = response.data;
      });
    };
  }
]);
