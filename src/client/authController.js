// add controllers
myApp.controller('AuthCtrl', ['$scope',
  '$http', 'saveAreaService',
  // THIS FUNCTION SENDS SEARCH PARAMS TO THE SCRAPING ROUTE.
  function($scope, $http, saveAreaService) {
    $scope.createUser = function() {
      var payload = {
        'email': $scope.email,
        'password': $scope.password,
        'phone': $scope.phone,
      };

      if (payload.email !== undefined) {
        $http.post('/users/createuser/', payload).then(function(response) {
          saveAreaService.userId = response.data._id;
          console.log(saveAreaService.userId, "  heres the user id");

        });
      }

    };
  }
]);
