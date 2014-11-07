angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, DashboardOptions) {
  $scope.options = DashboardOptions.all();
})

.controller('DashDetailCtrl', function($scope, $stateParams, DashboardOptions) {
  $scope.option = DashboardOptions.get($stateParams.optionId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
