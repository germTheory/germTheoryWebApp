angular.module('app.services', [])

  .factory('gtGoogleMaps',function(){

  })

  .factory('Geolocation', function ($q) {
    var log = [];
    var subscribers = [{
      success:function(location){
        log.push(location);
      }
    }];

    var bgGeo = navigator.plugins.BackgroundGeoLocation;
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
      },
      start: function(){
        bgGeo.start();
      },
      stop: function(){
        bgGeo.stop();
      },
      getLog: function(){
        return logs.slice();
      }

    };
  })

  .factory('GeoLocation', function ($http) {
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
  }]);
