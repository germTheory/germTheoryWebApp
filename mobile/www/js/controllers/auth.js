angular.module('app.controllers.auth', [])

  .controller('AuthController', function ($scope, $window, $location, AuthService) {
    $scope.user = {};

    $scope.signin = function () {
      AuthService.signin($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.germ-tracker', token);
          $location.path('/tab/map');
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.signup = function () {
      AuthService.signup($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.germ-tracker', token);
          $location.path('/tab/map');
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  });
