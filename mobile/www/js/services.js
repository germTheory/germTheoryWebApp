angular.module('starter.services', [])

/**
 * A simple example service that returns menu option data.
 */

.factory('DashboardOptions', function($http){

  var options = [
    { id: 0, name: 'Track'},
    { id: 1, name: 'Report'},
    { id: 2, name: 'Neighborhood'},
    { id: 3, name: 'Hot Spots'}, 
    { id: 4, name: 'Virus Types'}
  ];

  var _getUserLocations = function(){
    $http({
      method: 'GET',
      url: 'api/location'
    })
  };

  var _all = function() {
    return options;
  };

  var _get = function(optionId) {
    return options[optionId];
  }

  return {
    getUserLocations: _getUserLocations,
    all: _all,
    get: _get
  }
})

.factory('GeoLocation', function($http){

});


