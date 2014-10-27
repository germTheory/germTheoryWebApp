angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  /* START SOLUTION */
  $scope.link = {};
  $scope.addLink = function () {
    $scope.loading = true;
    Links.addLink($scope.link)
      .then(function () {
        $scope.loading = false;
        $location.path('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  /* END SOLUTION */
});
