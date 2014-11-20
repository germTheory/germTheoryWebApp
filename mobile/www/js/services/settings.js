angular.module('app.services.settings', ['app.services.common', 'app.services.geo-location'])
  .factory('Settings', ['LocalStorageService', 'BackgroundGeoLocation', function(LocalStorageService, BackgroundGeoLocation) {
    var getLocationTracking = function() {
      return LocalStorageService.getItem('locationTracking');
    };

    var setLocationTracking = function(setting) {
      LocalStorageService.setItem('locationTracking', setting);

      if (setting) {
        alert("Starting geolocation background service");
        BackgroundGeoLocation.startBGLocationService();
      } else {
        alert("Stopping geolocation background service");
        BackgroundGeoLocation.stopBGLocationService();
      }
    };

    return {
      getLocationTracking: getLocationTracking,
      setLocationTracking: setLocationTracking
    };
  }]);
