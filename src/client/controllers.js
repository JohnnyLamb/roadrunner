// add controllers
myApp.controller('zillowCtrl', ['$scope',
  '$http', 'saveAreaService',
  // THIS FUNCTION SENDS SEARCH PARAMS TO THE SCRAPING ROUTE.
  function($scope, $http, saveAreaService) {
    $scope.notShowing = false;
    var StephsId = "565f880f0d96e8c1d2d53bf6";
    var JohnnysId = "565f96e5c2c6583bda8fec32";
    var savedListings = {};
    $scope.listings = [];
    $scope.zillowScrape = function() {

        function initialize() {
              var mapProp = {
                center:new google.maps.LatLng(39.7392,-104.9903),
                zoom:10,
                mapTypeId:google.maps.MapTypeId.ROADMAP
              };
              var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
            }

       google.maps.event.addDomListener(window, 'load', initialize());


      $scope.notShowing = true;
      console.log('hit');
      var payload = {
        "location": $scope.location.toUpperCase(),
        "minPrice": $scope.minPrice,
        "maxPrice": $scope.maxPrice
      };
      $http.post('/scrapeZillow/scrape/', payload).then(function(response) {
        saveAreaService.listings = response.data;
        savedListings = {
          "location": $scope.location.toUpperCase(),
          "minPrice": $scope.minPrice,
          "maxPrice": $scope.maxPrice,
          'listingsArray': saveAreaService.listings
        };
        $scope.listings = response.data;
      });
    };

    $scope.selectListingForZillowCall = function(listing) {

      listing = listing.split(' ');
      var zip = listing[listing.length - 1];
      zip = zip.replace(/\D/g, '');
      var payload = {
        "address": listing[0] + " " + listing[1] + " " + listing[2] + " " + listing[3] + " ",
        "citystatezip": zip
      };
      $http.post('/zillowapi/callApi', payload).then(function(response) {
        console.log(response, "  Steph claps again");
        $scope.moreInfoHouse = response.data.address;
      });
    };







    $scope.demoListingsFn = function() {
      var arrayToPutInFront= ['1234 yippee kah yay way little doggy'];
      console.log(saveAreaService.demoListings, ' this is the array before it is changed');
      console.log(savedListings.listingsArray,' this is the array from the scrape');
      savedListings.listingsArray.unshift(arrayToPutInFront[0]);


    };

       $scope.keepAnEyeOnArea = function() {

      var compareWithListing = savedListings;
      console.log(savedListings.listingsArray);
      // console.log(saveAreaService.compare);
      var idToCompare = JohnnysId;
      $http.post('/listings/' + idToCompare + '/updateListings', savedListings).then(function(response) {
        console.log(response);

      });
    };



  }
]);


