angular.module('app.services.settings', ['app.services.common', 'app.services.geo-location'])
  .factory('Settings', ['LocalStorage', 'BackgroundGeoLocation', function(LocalStorage, BackgroundGeoLocation) {
    var getLocationTracking = function() {
      return LocalStorage.get('locationTracking');
    };

    var setLocationTracking = function(setting) {
      LocalStorage.set('locationTracking', setting);

      if (setting) {
        console.log("Starting geolocation background service");
        BackgroundGeoLocation.startBGLocationService();
      } else {
        console.log("Stopping geolocation background service");
        BackgroundGeoLocation.stopBGLocationService();
      }
    };

    return {
      getLocationTracking: getLocationTracking,
      setLocationTracking: setLocationTracking
    };
  }]);
