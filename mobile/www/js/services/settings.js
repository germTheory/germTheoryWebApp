angular.module('app.services.settings', ['app.services.common', 'app.services.geo-location'])
  .factory('Settings', function($http, LocalStorageService, BackgroundGeoLocation, Config) {
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

    var getUsername = function(user_id) {
      return $http.get('/api/users/' + user_id)
      .then(function(user) {
        return user.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    };

    var editSubmit = function(user_id, user) {
      return $http.put('/api/users/' + user_id, user)
        .then(function(user) {
          return user.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    return {
      getLocationTracking: getLocationTracking,
      setLocationTracking: setLocationTracking,
      getUsername: getUsername,
      editSubmit: editSubmit
    };
  });
