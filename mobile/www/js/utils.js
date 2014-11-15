angular.module('app.utils', [])
.controller('StorageCtrl', ['LocalStorage', 'BackgroundGeoLocation', function($localstorage) {
    $localstorage.toggleTrack = 0;

    $localstorage.pushTrack = function() {
      if ($localstorage.get('tracking') === 'false') {
        $localstorage.set('tracking', 'true'); 

        BackgroundGeoLocation.startBGLocationService()
        .then(function(data){
          alert("Started background location service");
        });
      }
      if ($localstorage.get('tracking') === 'true') {
        $localstorage.set('tracking', 'false');

        BackgroundGeoLocation.stopBGLocationService()
        .then(function(data){
          alert("Stopped background location service");
        });

      }
    };


    // $localstorage.set('tracking', 'false');  

    console.log($localstorage.get('tracking'));

}]);



    // $localstorage.toggleTrack = $localstorage.get('tracking');
    // $localstorage.togglePush = $localstorage.get('pushing');
    // $localstorage.toggleFb = $localstorage.get('fb');



    // // $localstorage.set('tracking', 'false');  

    // console.log($localstorage.get('tracking'));
    // console.log($localstorage.get('pushing'));