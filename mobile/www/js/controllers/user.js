angular.module('app.controllers.user', [])

  .controller('UserCtrl', function ($scope, $location, AuthService) {
    $scope.user = {};

    $scope.signin = function() {
      AuthService.signin($scope.user)
        .then(function (resp) {
          $scope.user = resp.data.user;
          $location.path('/tab/map');
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.signup = function() {
      AuthService.signup($scope.user)
        .then(function (resp) {
          $scope.user = resp.data.user;
          $location.path('/tab/map');
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.signout = function() {
      AuthService.signout();
      $scope.user = null;
    }
  });
