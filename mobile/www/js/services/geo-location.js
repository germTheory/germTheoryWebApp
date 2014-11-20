angular.module('app.services.geo-location', ['ngCordova'])

  // This background geo location is for the background location- 
  // tracking service
  .factory('BackgroundGeoLocation', function($cordovaGeolocation){
    
    var bgGeo;
    var onDeviceReady = function() {

      bgGeo = window.plugins.backgroundGeoLocation;
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
      // app must execute AT LEAST ONE call for the current position via standard Cordova geolocation,
      // in order to prompt the user for Location permission.
      window.navigator.geolocation.getCurrentPosition(function(location) {
        alert('Location from germ-tracker: '+ location.coords.latitude + ',' + location.coords.longitude);
      });

      bgGeo.configure(successFn, failureFn, {
        url: 'https://germ-tracker.herokuapp.com/api/locations', // Android only; ios allows javascript callbacks for your http
        // url: 'http://10.6.25.244:4568/api/locations', //  Android only required for ; ios allows javascript callbacks for your http
        params: {     
          user_id: 104,
        },
        headers: {
        },
        desiredAccuracy: 10,                        // set [0, 10, 100, 1000],  
                                                    // 0:  most aggressive, most accurate, worst battery drain,
                                                    // 1000:  least aggressive, least accurate, best for battery.
        stationaryRadius: 1,                        // radius around user location in meters
        distanceFilter: 5,                          // if it changed by 5 m/s, we'll reconfigure our pace.
        notificationTitle: 'Background tracking',   // Android only, customize the title of the notification
        notificationText: 'ENABLED',                // Android only, customize the text of the notification
        // activityType: "AutomotiveNavigation",    // iOS-only
        locationTimeout: 30,                        // The minimum time interval between location updates, in seconds.
        debug: false,                               // enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false                      // set to false if it should continue after the app terminates
      });
    
    }; // END document device ready listener

    var startBGLocationService = function () {
     
      // Turn ON the background-geolocation system.
      // The user will be tracked whenever they suspend the app.
      bgGeo.start();
    };

    var stopBGLocationService = function () {
      // turn OFF background-tracking
      bgGeo.stop()
    };

    return {
      onDeviceReady: onDeviceReady,
      startBGLocationService: startBGLocationService,
      stopBGLocationService: stopBGLocationService
    };

  })
  
  // This Geolocation is for the Mapping of
  // high risk areas centered around the user's 
  // current location
  .factory('Geolocation', function ($q) {
    var log = [];
    var waitForDevice = $q.defer();
    var subscribers = [{
      success:function(location){
        log.push(location);
      }
    }];

    var options = {
      maximumAge : 50000,
      timeout : 1000000,
      // false - gives wifi location data,
      // true - gives very accurate location data from the GPS
      enableHighAccuracy: false
    };

    var bgSuccess = function(){
      for(var i = 0; i < subscribers.length; i++){
        if(typeof subscribers[i].success === 'function'){
          subscribers[i].success.apply(this,arguments);
        }
      }
    };

    var bgError = function(){
      for(var i = 0; i < subscribers.length; i++){
        if(typeof subscribers[i].error === 'function'){
          subscribers[i].error.apply(this,arguments);
        }
      }
    };

    navigator.geolocation.watchPosition(bgSuccess,bgError,options);

    return {
      observe: function(observer){
        if(!observer.success||typeof observer.success !== 'function'){
          throw "missing success callback in observer";
        }
      },
      /**
       * Returns a promise of the users position.
       * @returns a promise
       */
      getCurrentPosition: function() {
        var q = $q.defer();

        window.navigator.geolocation.getCurrentPosition(
          function(result) {
            q.resolve(result);
          },
          function(error) {
            q.reject(error);
          });
        return q.promise;
      },
      start: function(){
        waitForDevice.promise.then(function(bgGeo){
          //bgGeo.stop();
        })
      },
      stop: function(){
        waitForDevice.promise.then(function(bgGeo){
          //bgGeo.stop();
        })
      },
      getLog: function(){
        return logs.slice();
      }
    };
  });
