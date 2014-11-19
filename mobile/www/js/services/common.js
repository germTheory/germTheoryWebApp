angular.module('app.services.common', [])
  .factory('Config',function(){
    return {
      url: 'https://germ-tracker.herokuapp.com'
    }
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
  }])
  .factory('RiskIndexService', function($http) {
    var getMyRiskIndex = function() {
      var userId = '1';
      return $http({
        method: 'GET',
        url: 'http://localhost:4568/api/proximity/users/' + userId
      })
        .then(function(resp) {
          return resp.data;
        })
        .catch(function(error) {
          console.error(error);
        });
    };

    return {
      getMyRiskIndex: getMyRiskIndex
    };
  });
