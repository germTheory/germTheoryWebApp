angular.module('app.controllers', [])
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
  .controller('MenuCtrl', function($scope) {
  })
  .controller('MyRiskCtrl', function($scope) {
  })
  .controller('ReportCtrl', function($scope) {
  })
  .controller('MenuDetailCtrl', function ($scope, $stateParams) {
  })
  .controller('BkGeoLocCtrl', function($scope, BackgroundGeoLocation) {

    $scope.data = {};
    $scope.startBGLocationService = function(){

      BackgroundGeoLocation.startBGLocationService()
        .then(function(data){
          alert("Started background location service");
        });
    };

    $scope.stopBGLocationService = function(){
      BackgroundGeoLocation.stopBGLocationService()
        .then(function(data){
          alert("Stopped background location service");
        });
    };

    $scope.startBGLocationService();

  });
