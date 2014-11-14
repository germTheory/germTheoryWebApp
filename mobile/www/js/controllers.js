angular.module('app.controllers', [])
  .controller('AppCtrl', function($scope) {
  })
  .controller('AuthCtrl', function($scope) {
  })
  .controller('MapCtrl', function($scope,Geolocation) {
    $scope.onMapCreated = function(map){
      Geolocation.getCurrentPosition().then(function(pos){
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      });
    }
  })
  .controller('MenuCtrl', function($scope) {
  })
  .controller('MyRiskCtrl', function($scope) {
  })
  .controller('ReportCtrl', function($scope) {
  })
  .controller('MenuDetailCtrl', function ($scope, $stateParams) {
  });
