angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, DashboardOptions) {
  $scope.options = DashboardOptions.all();
})

.controller('DashCtrlDetail', function($scope, $stateParams, DashboardOptions) {
  $scope.option = DashboardOptions.get($stateParams.optionId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  // $scope.track = Track.all();
})

.controller('GeoCtrl', function($cordovaGeolocation) {
 
  // // Your app must execute AT LEAST ONE call for the current position via standard Cordova geolocation,
  // //  in order to prompt the user for Location permission.
  window.navigator.geolocation.getCurrentPosition(function(location) {
      console.log('Location from cordova: ', location, $cordovaGeolocation);
  });

  // begin a watch
  var options = {
    maximumAge : 0,
    timeout : 30000,
    enableHighAccuracy: true
  };

  console.log("Before call to cordovaGeolocation");

  $cordovaGeolocation
    .getCurrentPosition()
    .then(function (position) {
      var lat  = position.coords.latitude;
      var longitude = position.coords.longitude;
      console.log("First pos: ", lat, longitude);
      // $.ajax({
      //   type: "POST",
      //   url: "http://127.0.0.1/api/location/create",
      //   dataType: "json",
      //   data: {latitude: lat, longitude: longitude},
      //   success: function(data) {
      //     var obj = JSON.parse(data);
      //     if (obj && obj.success === true) {
      //       console.log("Sent successfully");
      //     }
      //   },
      //   error: function(e) {
      //     alert('Error: ' + e.message);
      //   }
      // });
    }, function(err) {
      console.log("Encountered an error while using cordovaGeolocation");
      // error
    });



  var watch = $cordovaGeolocation.watchPosition(options);
  watch.promise.then(function()  { 
  /* Not  used */ 
    console.log("Here");
  },
    function(err) {
      // error
      console.log("Encountered an error while watching cordovaGeolocation");
    }, 
    function(position) {
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      console.log("Moved to: ", lat, long);
  });

  // clear watch
  $cordovaGeolocation.clearWatch(watch.watchId);


  // var id, target, options;

  // function success(pos) {
  //   var crd = pos.coords;

  //   if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
  //     console.log('Congratulations, you reached the target');
  //     navigator.geolocation.clearWatch(id);
  //   }
  // };

  // function error(err) {
  //   console.warn('ERROR(' + err.code + '): ' + err.message);
  // };

  // target = {
  //   latitude : 0,
  //   longitude: 0,
  // }

  // id = navigator.geolocation.watchPosition(success, error, options);
})

.controller('BkGeoLocCtrl', function($scope, $cordovaBackgroundGeolocation, $window, GeoLocationOptions) {

  // // Your app must execute AT LEAST ONE call for the current position via standard Cordova geolocation,
  // //  in order to prompt the user for Location permission.
  window.navigator.geolocation.getCurrentPosition(function(location) {
      console.log('Location from cordova: ', location);
  });

  $cordovaBackgroundGeolocation.configure({
    url: "",
      params: {},
      headers: {},
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      notificationTitle: 'Background location tracking',
      notificationText: 'ENABLED',
      // activityType: '?',
      debug: true,
      stopOnTerminate: true // enable this to clear background location settings when the app terminates
    })
  .then(function (location) {
    console.log("1111 : ", location);
  }, function (err) {
    console.error("2222 : ", err);
  });


  // Before each plugin you must check if your device has fully loaded, 
  // and if the plugins are available using a native cordova event called deviceready. 
  // Implement it like so:
  // document.addEventListener("deviceready", function () {
	 //  console.log("Inside BkGeoLoc, deviceready");
	 //  // `configure` calls `start` internally
	 //  $cordovaBackgroundGeolocation.configure(options).then(function (location) {
	 //    console.log(location);
	 //  }, function (err) {
	 //    console.error(err);
	 //  });

    // $scope.stopBackgroundGeolocation = function () {
    //   $cordovaBackgroundGeolocation.stop();
    // };
})

.controller('StopGeoLocCtrl', function($scope) {
  // $scope.track = Track.all();
  document.addEventListener("deviceready", function () {
    console.log("Stopping the location tracking");
    var bgGeo = window.plugins.backgroundGeoLocation;
    bgGeo.stop();
  });
});
