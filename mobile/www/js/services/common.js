angular.module('app.services.common', [])
  .factory('Config',function(){
    return {
      url: 'http://localhost:4568'
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
    var getRiskIndex = function(userId) {
      return $http({
        method: 'GET',
        url: '/api/proximity/users/' + userId
      })
        .then(function(resp) {
          return resp.data;
        })
        .catch(function(error) {
          throw error;
        });
    };

    return {
      getRiskIndex: getRiskIndex
    };
  });
