// This controller has a watch on the app to track the geolocation every (2mins ??)
// Tested on chrome browser on laptop so far. Not yet sure if it'll work on
// Android device/emulator
angular.module('app.geo-controller', [])

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

    // $scope.startBGLocationService();

  });
