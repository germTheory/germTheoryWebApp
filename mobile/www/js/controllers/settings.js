angular.module('app.controllers.settings', [])
  .controller('SettingsCtrl', function($scope, Settings) {
    $scope.locationTracking = Settings.getLocationTracking();

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
  });
