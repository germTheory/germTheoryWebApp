angular.module('app.controllers', [])
  .controller('AppCtrl', function($scope) {
  })
  .controller('AuthCtrl', function($scope) {
  })
  .controller('MapCtrl', function($scope,Geolocation) {
    $scope.locations = [];
    $scope.onMapCreated = function(map){
      Geolocation.getCurrentPosition().then(function(pos){
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      });
    };
    Geolocation.start();
    Geolocation.observe({success: function(loc){
      $scope.locations.push(loc);
    }})
  })
  .controller('MenuCtrl', function($scope) {
  })
  .controller('MyRiskCtrl', function($scope) {
  })
  .controller('ReportCtrl', function($scope) {
  })
  .controller('MenuDetailCtrl', function ($scope, $stateParams) {
  });
