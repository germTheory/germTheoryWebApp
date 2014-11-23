angular.module('app.services.common', [])
  .factory('Config',function(){
    return {
      url: 'https://germ-tracker.herokuapp.com'
    }
  })
  .factory('LocalStorageService', function($window) {
    var store = $window.localStorage;

    var setItem = function(key, value) {
      store.setItem(key, value);
    };

    var getItem = function(key, defaultValue) {
      return store.getItem(key) || defaultValue;
    };

    var removeItem = function(key) {
      store.removeItem(key);
    };

    return {
      setItem: setItem,
      getItem: getItem,
      removeItem: removeItem
    }
  })
  .factory('RiskIndexService', function($http, Config) {
    var getRiskIndex = function(userId) {
      console.log('userId', userId);
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
