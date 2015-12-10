// add controllers
myApp.controller('zillowCtrl', ['$scope',
  '$http', 'saveAreaService',
  // THIS FUNCTION SENDS SEARCH PARAMS TO THE SCRAPING ROUTE.
  function($scope, $http, saveAreaService) {
    $scope.notShowing = false;
    $scope.show = false;
    var StephsId = "565f880f0d96e8c1d2d53bf6";
    var JohnnysId = "565f96e5c2c6583bda8fec32";
    var savedListings = {};
    $scope.listings = [];
    var map;

    function initialize() {

      var mapProp = {
        center: {
          lat: 39.7392,
          lng: -104.9903
        },
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
      var myLatlng = new google.maps.LatLng(39.7392, -104.9903);
      var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Hello World!"
      });

      marker.setMap(map);
    }
    $scope.zillowScrape = function() {



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
        console.log(response.data);
        $scope.listings = response.data;
      });
    };

    $scope.selectListingForZillowCall = function(listing) {

      $scope.show = true;
      listing = listing.split(' ');
      var zip = listing[listing.length - 1];
      zip = zip.replace(/\D/g, '');
      var payload = {
        "address": listing[0] + " " + listing[1] + " " + listing[2] + " " + listing[3] + " ",
        "citystatezip": zip
      };
      $http.post('/zillowapi/callApi', payload).then(function(response) {

        console.log(response, "  Steph claps again");

        // console.log(response.data.images[0].image[0].url[0]);

        $scope.houseImages = ['http://theopendoor.lennar.com/wp-content/uploads/2015/07/Lennar-Colorado-Home.jpg', 'http://www.lennar.com/images/com/images/new-homes/4/17/2326/mhi/Lennar-Colorado-Active-projects-Stapleton_HT-2928-Elev-Shingle_Scheme-01_HR_02.jpg', 'http://www.lennar.com/images/com/images/new-homes/4/17/2102/mhi/Stonehaven2-ext_1200x650.jpg', 'http://www.lennar.com/images/com/images/new-homes/4/17/222/mhi/13_Lennar-Colorado-Active-projects-Blackstone-48-ft_HT-3498-Craftsman_Scheme-07_01.jpg', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRf2Pmnhl4E9XdF2enlfzFw3RqxXGiz8q56cXc3TeuozNMxIFwM', 'http://theopendoor.lennar.com/wp-content/uploads/2015/04/Stonehaven-1.jpg'];



        $scope.moreInfoHouse = {
          street: response.data.address[0].street[0],
          city: response.data.address[0].city[0],
          picture: $scope.houseImages[0]
        };

        $scope.latitude = response.data.address[0].latitude[0];
        $scope.longitude = response.data.address[0].longitude[0];

        function initializeMarker(lat, long) {

          var mapProp = {
            center: {
              lat: 39.7392,
              lng: -104.9903
            },
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
          var myLatlng = new google.maps.LatLng(lat, long);
          var marker = new google.maps.Marker({
            position: myLatlng,
            title: "Hello World!"
          });

          marker.setMap(map);
        }

        initializeMarker($scope.latitude, $scope.longitude);
        // To add the marker to the map, call setMap();
      });



    };


    $scope.demoListingsFn = function() {
      var arrayToPutInFront = ['1234 yippee kah yay way little doggy'];
      console.log(saveAreaService.demoListings, ' this is the array before it is changed');
      console.log(savedListings.listingsArray, ' this is the array from the scrape');
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
