angular.module('app.services.settings', ['app.services.common', 'app.services.geo-location'])
  .factory('Settings', ['LocalStorage', 'BackgroundGeoLocation', function(LocalStorage, BackgroundGeoLocation) {
    var getLocationTracking = function() {
      return LocalStorage.get('locationTracking');
    };

    var setLocationTracking = function(setting) {
      LocalStorage.set('locationTracking', setting);

      if (setting) {
        alert("Starting geolocation background service");
        BackgroundGeoLocation.startBGLocationService();
      } else {
        alert("Stopping geolocation background service");
        BackgroundGeoLocation.stopBGLocationService();
      }
    };

    var getUsername = function(user_id) {
      $http.get('/api/users/1')
      .success(function(user) {
        console.log('Successful user name search: ', user);
      })
      .error(function(err) {
        console.log('Could not get user name');
        console.log(err);
      });
    };

    return {
      getLocationTracking: getLocationTracking,
      setLocationTracking: setLocationTracking,
      getUsername: getUsername
    };
  }]);
