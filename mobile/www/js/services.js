angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  var _all = function() {
    return friends;
  };

  var _get = function(friendId) {
    return friends[friendId];
  }

  return {
    all: _all,
    get: _get
  }
})
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
});
