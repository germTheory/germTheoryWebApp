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
          alert(error.data.error);
          $location.path('/signup');
        });
    };

    $scope.signup = function() {
      AuthService.signup($scope.user)
        .then(function(resp) {
          $scope.user = resp.data.user;
          $location.path('/tab/map');
        })
        .catch(function(error) {
          alert(error.data.error);
          $location.path('/signup');
        });
    };

    $scope.signout = function() {
      AuthService.signout();
      $scope.user = null;
    };
  });

  
