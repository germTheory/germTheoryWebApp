angular.module('app.services', [])

  .factory('gtGoogleMaps',function(){

  })

  .factory('Geolocation', function ($q) {
    return {
      getCurrentPosition: function() {
        var q = $q.defer();
        navigator.geolocation.getCurrentPosition(
          function(result) {
            q.resolve(result);
          },
          function(error) {
            q.reject(error);
          });
        return q.promise;
      }

    };
  })

  .factory('LocalStorage', ['$window', function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
  }])

  .factory('BackgroundGeoLocation', function(){

    var bgGeo = window.plugins.backgroundGeoLocation;

    //
    // This would be your own callback for Ajax-requests after POSTing background geolocation to your server.
    //
    var yourAjaxCallback = function(response) {
      ////
      // IMPORTANT:  You must execute the #finish method here to inform the native plugin that you're finished,
      //  and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
      // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      //
      //
      bgGeo.finish();
    };

    //
    // This callback will be executed every time a geolocation is recorded in the background.
    // Only for iOS, not for Android
    //
    var callbackFn = function(location) {
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

    var startBGLocationService = function () {
      // // Your app must execute AT LEAST ONE call for the current position via standard Cordova geolocation,
      // //  in order to prompt the user for Location permission.
      window.navigator.geolocation.getCurrentPosition(function(location) {
        // alert('Location from cordova: '+ location.coords.latitude + ',' + location.coords.longitude);
      });

      // BackgroundGeoLocation is highly configurable.
      bgGeo.configure(callbackFn, failureFn, {
        url: 'http://germ-tracker.herokuapp.com/api/locations', // <-- only required for Android; ios allows javascript callbacks for your http
        params: {     
          // will be sent in with 'location' in POST data (root level params)
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
        stopOnTerminate: true // set to false if it should continue after the app terminates
      });

      // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
      bgGeo.start();

    };

    var stopBackgroundGeolocation = function () {
      // If you wish to turn OFF background-tracking, call the #stop method.
      bgGeo.stop()
    };

    return {
      startBGLocationService: startBGLocationService,
      stopBackgroundGeolocation: stopBackgroundGeolocation
    };
    
  });
