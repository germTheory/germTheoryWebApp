angular.module('app.controllers.common', ['app.services.common'])
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
  .controller('MyRiskCtrl', function($scope) {
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
