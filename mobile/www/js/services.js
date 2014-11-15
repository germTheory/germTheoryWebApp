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

  .factory('BackgroundGeoLocation', function($cordovaGeolocation){

    var bgGeo = window.plugins.backgroundGeoLocation;

    // This would be your own callback for Ajax-requests after POSTing 
    // background geolocation to your server.
    // var yourAjaxCallback = function(response) {
    //   bgGeo.finish();
    // };

    // This callback will be executed every time a geolocation is recorded in the background.
    // Only for iOS, not for Android
    var successFn = function(location) {
      var data = {
        latitude: location.latitudue,
        longitude: location.longitude,
        user_id: 1
      };     
      console.log("Location data: ", data);

      bgGeo.finish();
      // yourAjaxCallback.call(this);
    };

    var failureFn = function(error) {
      alert('BackgroundGeoLocation error' + error);
    };

    var startBGLocationService = function () {

      // app must execute AT LEAST ONE call for the current position via standard Cordova geolocation,
      // in order to prompt the user for Location permission.
      window.navigator.geolocation.getCurrentPosition(function(location) {
        alert('Location from cordova: '+ location.coords.latitude + ',' + location.coords.longitude);
      });

      bgGeo.configure(callbackFn, failureFn, {
        // url: 'http://germ-tracker.herokuapp.com/api/locations', // Android only; ios allows javascript callbacks for your http
        url: 'http://10.6.25.244:4568/api/locations', //  Android only required for ; ios allows javascript callbacks for your http
        params: {     
          user_id: 1
        },
        headers: {
        },
        desiredAccuracy: 10,
        stationaryRadius: 10,
        distanceFilter: 30,
        notificationTitle: 'Background tracking',   // Android only, customize the title of the notification
        notificationText: 'ENABLED',                // Android only, customize the text of the notification
        // activityType: "AutomotiveNavigation",    // iOS-only
        locationTimeout: 60,                        // The minimum time interval between location updates, in seconds.
        debug: true,                                // enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: true                       // set to false if it should continue after the app terminates
      });

      // Turn ON the background-geolocation system. 
      // The user will be tracked whenever they suspend the app.
      bgGeo.start();

    };

    var stopBGLocationService = function () {
      // turn OFF background-tracking
      bgGeo.stop()
    };

    return {
      startBGLocationService: startBGLocationService,
      stopBGLocationService: stopBGLocationService
    };
    
  });
  .factory('Settings', ['LocalStorage', function(LocalStorage) {
    var getLocationTracking = function() {
      return LocalStorage.get('locationTracking');
    };
    var setLocationTracking = function(setting) {
      LocalStorage.set('locationTracking', setting);

      if (!setting) {
        //TODO: stop background service
      }
    };

    return {
      getLocationTracking: getLocationTracking,
      setLocationTracking: enableLocationTracking
    };
  }]);
