angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here
  /* START SOLUTION */
  $scope.data = {};
  $scope.getLinks = function () {
    Links.getAll()
      .then(function (links) {
        $scope.data.links = links;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  $scope.getLinks();
  /* END SOLUTION */
});
