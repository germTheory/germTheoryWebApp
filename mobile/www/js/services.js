angular.module('starter.services', [])

/**
 * A simple example service that returns menu option data.
 */

.factory('DashboardOptions', function($http){

  var options = [
    { id: 0, name: 'Track'},
    { id: 1, name: 'Report'},
    { id: 2, name: 'Neighborhood'},
    { id: 3, name: 'Hot Spots'}, 
    { id: 4, name: 'Virus Types'}
  ];

  var _getUserLocations = function(){
    $http({
      method: 'GET',
      url: 'api/location'
    })
  };

  var _all = function() {
    return options;
  };

  var _get = function(optionId) {
    return options[optionId];
  }

  return {
    getUserLocations: _getUserLocations,
    all: _all,
    get: _get
  }
})

.factory('GeoLocationOptions', function($http, $window){

  // var callbackFn = function(location) {
  //   console.log("Location: lat, long: ", location.latitude, location.longitude);
  // }

  // var failureFn = function(err) {
  //   console.log("Failed to get location data");
  // }

  // var bgConnect = function(){
  //   console.log("bgConnect 1");
  //   var bgGeo = $window.plugins.backgroundGeoLocation;
  //   console.log("bgConnect 2");

  //   bgGeo.configure(callbackFn, failureFn, {
  //               url: "127.0.0.1/api/location/create", 
  //               params: {      // HTTP POST params sent to your server when persisting locations. It will be posted to your server as is , so you can set any parameter you want
  //                   user_credentials: "aS9393498asdFfaSDF",
  //                   parameter2: "another parameter value I want to send" 
  //               },
  //               desiredAccuracy: 10,
  //               stationaryRadius: 20,
  //               distanceFilter: 30,
  //               debug: true // <-- enable this hear sounds for background-geolocation life-cycle.
  //           });

  //   console.log("bgConnect 3");

  //   // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
  //   bgGeo.start();
  // };

  // return {bgConnect: bgConnect};
});


