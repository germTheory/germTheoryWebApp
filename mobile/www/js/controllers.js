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
  });
// This controller has a watch on the app to track the geolocation every (2mins ??)
// Tested on chrome browser on laptop so far. Not yet sure if it'll work on
// Android device/emulator
angular.module('app.geo-controller', [])
  // .controller('GeoCtrl', function ($scope, $cordovaGeolocation, GeoLocation) {

  //   // begin a watch
  //   var options = {
  //     maximumAge : 50000,
  //     timeout : 1000000,
  //     // false - gives wifi location data, 
  //     // true - gives very accurate location data from the GPS
  //     enableHighAccuracy: false 
  //   };

  //   var onDeviceReady = function(){
  //     navigator.geolocation.getCurrentPosition(
  //     function(position) {
  //         alert(position.coords.latitude + ',' + position.coords.longitude);
  //     },
  //     function() {
  //         alert('Error getting location');
  //     });

  //     var id;

  //     function success(pos) {
  //       var crd = pos.coords;
  //       var data = {
  //         latitude: pos.coords.latitude,
  //         longitude: pos.coords.longitude,
  //         date: pos.timestamp,
  //         user_id: 1
  //       };

  //       // alert('watch pos data: '+ pos.coords.latitude + ',' + pos.coords.longitude);

  //       // POST location data to server
  //       $.ajax({
  //         type: "POST",
  //         contentType: "application/json; charset=utf-8",
  //         url: "https://germ-tracker.herokuapp.com/api/locations",
  //         data: JSON.stringify(data),
  //         success: function(data) {
  //           // alert("Sent successfully");
  //         },
  //         error: function(e) {
  //           alert('Error: ' + e.message);
  //         }
  //       });
  //     };

  //     function error(err) {
  //       alert('ERROR(' + err.code + '): ' + err.message);
  //     };

  //     id = navigator.geolocation.watchPosition(success, error, options);
  //   }
  //   // fireup the event once device is ready and all plugins are loaded
  //   document.addEventListener("deviceready", onDeviceReady, false);

  // })

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
