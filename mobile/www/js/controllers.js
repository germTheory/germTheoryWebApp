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

// This controller has a watch on the app to track the geolocation every (2mins ??)
// Tested on chrome browser on laptop so far. Not yet sure if it'll work on 
// Android device/emulator
.controller('GeoCtrl', function($scope, $cordovaGeolocation, GeoLocation) {
  $scope.coords = {};
 
  // begin a watch
  var options = {
    maximumAge : 10000,
    timeout : 300000,
    enableHighAccuracy: true
  };

  $cordovaGeolocation
    .getCurrentPosition()
    .then(function (position) {
      $scope.coords.latitude = position.coords.latitude;
      $scope.coords.longitude = position.coords.longitude;
      var data = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                user_id: 1
              };
      // console.log("First pos: ", position, JSON.stringify(data));

      // POST location data to server
      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://127.0.0.1:4568/api/locations",
        data: JSON.stringify(data),
        success: function(result) {
            console.log("Sent successfully data: ", result);
        },
        error: function(e) {
          console.warn('Error: ' + e.message);
        }
      });

    }, function(err) {
      console.log("Encountered an error while using cordovaGeolocation");
      // error
    });

  var id;

  function success(pos) {
    var crd = pos.coords;
    var data = {
              latitude: pos.coords.latitude, 
              longitude: pos.coords.longitude,
              user_id: 1
              };
    console.log("watch pos data: ", JSON.stringify(data));
    // POST location data to server
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: "http://127.0.0.1:4568/api/locations",
      data: JSON.stringify(data),
      success: function(data) {
        console.log("Sent successfully");
      },
      error: function(e) {
        console.warn('Error: ' + e.message);
      }
    });
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  target = {
    latitude : 0,
    longitude: 0,
  }

  id = navigator.geolocation.watchPosition(success, error, options);

})

.controller('BkGeoLocCtrl', function($scope, $cordovaBackgroundGeolocation, $window, GeoLocationOptions) {

  // // Your app must execute AT LEAST ONE call for the current position via standard Cordova geolocation,
  // //  in order to prompt the user for Location permission.
  window.navigator.geolocation.getCurrentPosition(function(location) {
      console.log('Location from cordova: ', location);
  });

  var bgGeo = window.plugins.backgroundGeoLocation;

  /**
  * This would be your own callback for Ajax-requests after POSTing background geolocation to your server.
  */
  var yourAjaxCallback = function(response) {
      ////
      // IMPORTANT:  You must execute the #finish method here to inform the native plugin that you're finished,
      //  and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
      // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      //
      //
      bgGeo.finish();
  };

  /**
  * This callback will be executed every time a geolocation is recorded in the background.
  */
  var callbackFn = function(location) {
      console.log('[js] BackgroundGeoLocation callback:  ' + location.latitudue + ',' + location.longitude);
      // Do your HTTP request here to POST location to your server.
      //
      //
      yourAjaxCallback.call(this);
  };

  var failureFn = function(error) {
      console.log('BackgroundGeoLocation error');
  }

  // BackgroundGeoLocation is highly configurable.
  bgGeo.configure(callbackFn, failureFn, {
      url: 'http://127.0.0.1:4568/api/locations', // <-- only required for Android; ios allows javascript callbacks for your http
      params: {                                               // HTTP POST params sent to your server when persisting locations.
          auth_token: 'user_secret_auth_token', // TODO: fix this
          latitude: 'latitude', // TODO: fix this
          longitude: 'longitude' // TODO: fix this
      },
      headers: {
          'contentType': 'application/json; charset=utf-8'
      },
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      notificationTitle: 'Background tracking',   // <-- android only, customize the title of the notification
      notificationText: 'ENABLED',                // <-- android only, customize the text of the notification
      // activityType: "AutomotiveNavigation",       // <-- iOS-only
      debug: true     // <-- enable this hear sounds for background-geolocation life-cycle.
  });

  // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
  bgGeo.start();

  // If you wish to turn OFF background-tracking, call the #stop method.
  // bgGeo.stop()


  // $cordovaBackgroundGeolocation.configure({
  //   url: "",
  //     params: {},
  //     headers: {},
  //     desiredAccuracy: 10,
  //     stationaryRadius: 20,
  //     distanceFilter: 30,
  //     notificationTitle: 'Background location tracking',
  //     notificationText: 'ENABLED',
  //     // activityType: '?',
  //     debug: true,
  //     stopOnTerminate: true // enable this to clear background location settings when the app terminates
  //   })
  // .then(function (location) {
  //   console.log("1111 : ", location);
  // }, function (err) {
  //   console.error("2222 : ", err);
  // });


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
