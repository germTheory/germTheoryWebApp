angular.module('app.controllers', ['app.services'])
  .controller('AppCtrl', function($scope) {
  })
  .controller('AuthCtrl', function($scope) {
  })
  .controller('MapCtrl', function($scope,Geolocation) {
    $scope.mapCreated = function(map){
      Geolocation.getCurrentPosition().then(function(pos){
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      });
    }
  })
  .controller('MyRiskCtrl', function($scope) {
  })
  .controller('ReportCtrl', function($scope) {
  })
  .controller('SettingsCtrl', function($scope, Settings) {
    $scope.locationTracking = Settings.getLocationTracking();

    $scope.toggleLocationTracking = function() {
      $scope.locationTracking = !$scope.locationTracking;
      Settings.setLocationTracking($scope.locationTracking);
    }
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
