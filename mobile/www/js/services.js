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
  });
