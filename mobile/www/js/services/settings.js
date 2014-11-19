angular.module('app.services.settings', ['app.services.common'])
  .factory('Settings', ['LocalStorage', '$http', function(LocalStorage, $http) {
    var getLocationTracking = function() {
      return LocalStorage.get('locationTracking');
    };

    // var setLocationTracking = function(setting) {
    //   LocalStorage.set('locationTracking', setting);

    //   if (setting) {
    //     alert("Starting geolocation background service");
    //     BackgroundGeoLocation.startBGLocationService();
    //   } else {
    //     alert("Stopping geolocation background service");
    //     BackgroundGeoLocation.stopBGLocationService();
    //   }
    // };

    var getUsername = function(user_id) {
      return $http.get('/api/users/' + user_id)
      .then(function(user) {
        return user.data;
      })
      .catch(function(err) {
        console.log('Could not get user name');
        console.log(err);
      });
    };

    return {
      getLocationTracking: getLocationTracking,
      // setLocationTracking: setLocationTracking,
      getUsername: getUsername
    };
  }]);
