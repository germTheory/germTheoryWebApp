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
  .factory('GeoLocation',  function ($http) {
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
    };
  }])
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
