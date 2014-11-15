/*
angular.module('app.utils', ['app.services'])
.controller('StorageCtrl', ['$scope', 'LocalStorage', function($scope, LocalStorage) {
    $scope.toggleTrack = LocalStorage.get('tracking');

    $scope.pushTrack = function() {
      console.log('got into pushTrack');
      if (LocalStorage.get('tracking') === 'false') {
        LocalStorage.set('tracking', 'true'); 
        console.log(LocalStorage.get('tracking'));
      }
      else {
        LocalStorage.set('tracking', 'false');
        console.log(LocalStorage.get('tracking'));
      }
    };


    // $scope.pushTrack = function () {
    //   console.log('got into new pushTrack');
    // }

    // $scope.pushTrack();
    // $localstorage.set('tracking', 'false');  
    // var name = window.localStorage['name'] || 'you';
    // alert('Hello, ' + name);
    // console.log($localstorage.get('tracking'));

}]);



    // $localstorage.toggleTrack = $localstorage.get('tracking');
    // $localstorage.togglePush = $localstorage.get('pushing');
    // $localstorage.toggleFb = $localstorage.get('fb');



    // // $localstorage.set('tracking', 'false');  

    // console.log($localstorage.get('tracking'));
    // console.log($localstorage.get('pushing'));*/
