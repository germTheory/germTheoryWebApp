// This controller has a watch on the app to track the geolocation every (2mins ??)
// Tested on chrome browser on laptop so far. Not yet sure if it'll work on
// Android device/emulator
angular.module('app.geo-controller', [])
  .controller('GeoCtrl', function ($scope, $cordovaGeolocation, GeoLocation) {
    $scope.coords = {};

    // begin a watch
    var options = {
      maximumAge : 50000,
      timeout : 1000000,
      // false - gives wifi location data, 
      // true - gives very accurate location data from the GPS
      enableHighAccuracy: false 
    };

    var onDeviceReady = function(){
      navigator.geolocation.getCurrentPosition(
        function(position) {
            alert(position.coords.latitude + ',' + position.coords.longitude);
        },
        function() {
            alert('Error getting location');
        });

      var id;

      function success(pos) {
        var crd = pos.coords;
        var data = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          date: pos.timestamp,
          user_id: 1
        };
        
        // alert('watch pos data: '+ pos.coords.latitude + ',' + pos.coords.longitude);

        // POST location data to server
        $.ajax({
          type: "POST",
          contentType: "application/json; charset=utf-8",
          url: "https://germ-tracker.herokuapp.com/api/locations",
          data: JSON.stringify(data),
          success: function(data) {
            // alert("Sent successfully");
          },
          error: function(e) {
            alert('Error: ' + e.message);
          }
        });
      }

      function error(err) {
        alert('ERROR(' + err.code + '): ' + err.message);
      }

      id = navigator.geolocation.watchPosition(success, error, options);
    };

    // fireup the event once device is ready and all plugins are loaded
    document.addEventListener("deviceready", onDeviceReady, false);
  })

  .controller('BkGeoLocCtrl', function($scope, $cordovaBackgroundGeolocation, GeoLocation) {

    var onDeviceReady = function(){

      // // Your app must execute AT LEAST ONE call for the current position via standard Cordova geolocation,
      // //  in order to prompt the user for Location permission.
      window.navigator.geolocation.getCurrentPosition(function(location) {
        // alert('Location from cordova: '+location.coords.latitude+','+location.coords.longitude);
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
       * THIS CALLBACK FUNCTION WILL NOT BE CALLED FOR ANDROID
       */
      var callbackFn = function(location) {
        // alert('[js] BackgroundGeoLocation callback:  ' + location.latitudue + ',' + location.longitude);

        var data = {
          latitude: location.latitudue,
          longitude: location.longitude,
          user_id: 1
        };     
         
        // Do your HTTP request here to POST location to your server.
        // POST location data to server
        $.ajax({
          type: "POST",
          contentType: "application/json; charset=utf-8",
          url: "https://germ-tracker.herokuapp.com/api/locations",
          data: JSON.stringify(data),
          success: function(data) {
            alert("Sent successfully");
          },
          error: function(e) {
            alert('Error: ' + e.message);
          }
        });
        yourAjaxCallback.call(this);
      };

      var failureFn = function(error) {
        alert('BackgroundGeoLocation error');
      };

      // BackgroundGeoLocation is highly configurable.
      bgGeo.configure(callbackFn, failureFn, {
        url: 'http://germ-tracker.herokuapp.com/api/locations', // <-- only required for Android; ios allows javascript callbacks for your http
        params: {     
          // will be sent in with 'location' in POST data (root level params)
          // these will be added automatically in setup()                                          // HTTP POST params sent to your server when persisting locations.
          // auth_token: 'user_secret_auth_token', // TODO: fix this
          user_id: 1
        },
        headers: {
        },
        desiredAccuracy: 10,
        stationaryRadius: 10,
        distanceFilter: 30,
        notificationTitle: 'Background tracking',   // <-- android only, customize the title of the notification
        notificationText: 'ENABLED',                // <-- android only, customize the text of the notification
        // activityType: "AutomotiveNavigation",       // <-- iOS-only
        debug: true,     // <-- enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: true
      });

      // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
      bgGeo.start();

      // If you wish to turn OFF background-tracking, call the #stop method.
      // bgGeo.stop()

      // document.addEventListener("deviceready", function () {
      //  console.log("Inside BkGeoLoc, deviceready");
      //  // `configure` calls `start` internally
      //  $cordovaBackgroundGeolocation.configure(options).then(function (location) {
      //    console.log(location);
      //  }, function (err) {
      //    console.error(err);
      //  });

      // })
    
      $scope.stopBackgroundGeolocation = function () {
        $cordovaBackgroundGeolocation.stop();
      };

    };

    // Before each plugin you must check if your device has fully loaded,
    // and if the plugins are available using a native cordova event called deviceready.
    document.addEventListener("deviceready", onDeviceReady, false);
  });