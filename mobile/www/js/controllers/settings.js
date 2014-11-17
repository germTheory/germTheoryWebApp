angular.module('app.controllers.settings', ['app.services.common', 'app.services.settings'])
  .controller('SettingsCtrl', function($scope, Settings) {
    $scope.locationTracking = Settings.getLocationTracking();

    $scope.toggleLocationTracking = function() {
      $scope.locationTracking = !$scope.locationTracking;
      Settings.setLocationTracking($scope.locationTracking);
    }
  });
