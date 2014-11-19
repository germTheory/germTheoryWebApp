angular.module('app.controllers.settings', [])
  .controller('SettingsCtrl', function($scope, Settings) {
    $scope.asdf = "aaaa";
    $scope.locationTracking = Settings.getLocationTracking();

    $scope.getUsername = function() {
      // User id hardcoded until we have a way to get id of current user from OAuth or local login
      Settings.getUsername('1')
        .then(function(user) {
          $scope.userName = user.name;
          $scope.userEmail = user.email;
        });
    };

    /*
     * Note: There is a bug in Ionic where ng-click fires twice on clicking a button
     * It appears that this issue only occurs in development environment but we need to confirm this in using an actual device once we're ready
     * https://github.com/driftyco/ionic/issues/1022
     * http://codepen.io/anon/pen/JrpuB?editors=101
     */
    $scope.toggleLocationTracking = function(event) {
      event.stopPropagation();
      $scope.locationTracking = ($scope.locationTracking === true) ? false: true;
      Settings.setLocationTracking($scope.locationTracking);
     }

     $scope.getUsername();
  });
