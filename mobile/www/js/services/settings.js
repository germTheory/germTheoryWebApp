angular.module('app.services.settings', ['app.services.geo-location'])
  .factory('Settings', ['LocalStorage', 'BackgroundGeoLocation', function(LocalStorage, BackgroundGeoLocation) {
    var getLocationTracking = function() {
      return LocalStorage.get('locationTracking');
    };

    var setLocationTracking = function(setting) {
      debugger;
      LocalStorage.set('locationTracking', setting);

      if (setting) {
        alert("Starting Background geolocation");
        BackgroundGeoLocation.startBGLocationService();
      } else {
        alert("Stopping Background geolocation");
        BackgroundGeoLocation.stopBGLocationService();
      }
    };

    return {
      getLocationTracking: getLocationTracking,
      setLocationTracking: setLocationTracking
    };
  }]);