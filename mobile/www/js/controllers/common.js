angular.module('app.controllers.common', [])
  .controller('AuthCtrl', function($scope) {
  })
  .controller('MapCtrl', function($scope, Geolocation) {
    $scope.locations = [];
    $scope.onMapCreated = function(map){
      Geolocation.getCurrentPosition().then(function(pos){
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      });
    };

  })
  .controller('MyRiskCtrl', function($scope, RiskIndexService) {
    $scope.data = {};
    $scope.getMyRiskIndex = function() {
      RiskIndexService.getMyRiskIndex()
        .then(function(resp) {
          var indexValue = resp[0] || 0;

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
          console.error(error);
        });
    };

    $scope.getMyRiskIndex();
  })
  .controller('ReportCtrl', function($scope) {
  })
  .controller('StorageCtrl', ['$scope', 'LocalStorage', function($scope, LocalStorage) {
    $scope.toggleTrack = LocalStorage.get('tracking');

    $scope.pushTrack = function() {
      console.log('got into pushTrack');
      if (LocalStorage.get('tracking') === 'false') {
        LocalStorage.set('tracking', 'true');
        console.log(LocalStorage.get('tracking'));
      }
      else {
        LocalStorage.set('tracking', 'false');
        console.log(LocalStorage.get('tracking'));
      }
    };
  }]);
