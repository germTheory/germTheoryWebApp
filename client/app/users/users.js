angular.module('shortly.users', [])
  .controller('UsersController', function ($scope, Users) {
    $scope.data = {};
    $scope.getUsers = function () {
      Users.getAll()
        .then(function (users) {
          $scope.data.users = users;
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    $scope.getUsers();
  });
