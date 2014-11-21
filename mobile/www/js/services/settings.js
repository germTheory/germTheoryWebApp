angular.module('app.services.settings', ['app.services.common', 'app.services.geo-location'])
  .factory('Settings', ['LocalStorageService', 'BackgroundGeoLocation', 'Config', function($http, LocalStorageService, BackgroundGeoLocation, Config) {
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
      return $http.get(Config.url + '/api/users/' + user_id)
      .then(function(user) {
        return user.data;
      })
      .catch(function(err) {
        console.log('Could not get user name');
        console.log(err);
      });
    };

    var editSubmit = function(user_id, name, email, birthdate, gender, currPassword, newPass, newPassConfirm) {
      var data = {
        name: name,
        email: email,
        birthdate: birthdate
      };
      console.log(data);
      return $http.put(Config.url + '/api/users/' + user_id, data)
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
      setLocationTracking: setLocationTracking,
      getUsername: getUsername,
      editSubmit: editSubmit
    };
  }]);
