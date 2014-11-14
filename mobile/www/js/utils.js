angular.module('app.utils', [])
.controller('StorageCtrl', ['LocalStorage', function($localstorage) {
    $localstorage.set('name', 'max');
    console.log($localstorage.get('name'));
}]);


