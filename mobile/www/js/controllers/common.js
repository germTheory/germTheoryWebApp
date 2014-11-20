angular.module('app.controllers.common', [])
  .controller('MapCtrl', function($scope, Geolocation) {
    $scope.locations = [];
    $scope.onMapCreated = function(map){
      Geolocation.getCurrentPosition().then(function(pos){
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      });
    };
  })
  .controller('MyRiskCtrl', function($scope, RiskIndexService, LocalStorageService) {
    $scope.data = {};
    $scope.getMyRiskIndex = function() {

      var userId = LocalStorageService.getItem('id');
      if (!userId) {
        // redirect to /login page if userId is not present
        $location.path('/signin');
      }

      RiskIndexService.getRiskIndex(userId)
        .then(function(resp) {
          var indexValue = resp || 0;

          // Note: Hardcode index threshold values for now
          if (indexValue >= 0.75) {
            $scope.data["myRiskIndex"] = "High"
          } else if (indexValue >= 0.3 && indexValue < 0.75) {
            $scope.data["myRiskIndex"] = "Medium"
          } else  {
            $scope.data["myRiskIndex"] = "Low"
          }
        })
        .catch(function (error) {
          throw error;
        });
    };

    $scope.getMyRiskIndex();
  })
  .controller('StorageCtrl', ['$scope', 'LocalStorageService', function($scope, LocalStorageService) {
    $scope.toggleTrack = LocalStorage.get('tracking');

    $scope.pushTrack = function() {
      console.log('got into pushTrack');
      if (LocalStorage.get('tracking') === 'false') {
        LocalStorage.setItem('tracking', 'true');
        console.log(LocalStorage.get('tracking'));
      }
      else {
        LocalStorage.setItem('tracking', 'false');
        console.log(LocalStorage.get('tracking'));
      }
    };
  }]);
