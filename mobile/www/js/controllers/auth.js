angular.module('app.controllers.auth', [])

  .controller('AuthCtrl', function ($scope, $window, $location, AuthService) {
    $scope.user = {};

    $scope.signin = function() {
      AuthService.signin($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('auth-token', token);
          $location.path('/tab/map');
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.signup = function() {
      AuthService.signup($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('auth-token', token);
          $location.path('/tab/map');
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  });
