angular.module('app.controllers.common', [])
  .controller('MapCtrl', function($scope, $ionicModal, Config, Geolocation) {
    $scope.locations = [];
    $scope.Config = Config;
    $scope.date = 10;
    // $ionicModal.fromTemplateUrl('datepicker-modal.html', function(modal) {
    //     $scope.dateModal = modal;
    //   }, {
    //     scope: $scope,
    //     animation: 'slide-in-up'
    //   });
    $scope.options = {
      format: 'yyyy/mm/dd', // ISO formatted date
      onClose: function(e) { 
        $scope.date = this.$node[0].value;
      }
    }

    $scope.triggerDatepicker = function(){
      angular.element('input').trigger('click');
    }
  })
  .controller('MyRiskCtrl', function($scope, $location, RiskIndexService, LocalStorageService) {
    $scope.data = {};
    $scope.getMyRiskIndex = function() {

      var userId = LocalStorageService.getItem('user_id');
      if (!userId) {
        // redirect to /login page if userId is not present
        $location.path('/signin');
      }

      RiskIndexService.getRiskIndex(userId)
        .then(function(resp) {
          var indexValue = resp || 0;

          // Note: Hardcode index threshold values for now
          if (indexValue >= 0.75) {
            $scope.data["myRiskIndex"] = "High"
          } else if (indexValue >= 0.3 && indexValue < 0.75) {
            $scope.data["myRiskIndex"] = "Medium"
          } else  {
            $scope.data["myRiskIndex"] = "Low"
          }
        })
        .catch(function (error) {
          throw error;
        });
    };

    $scope.getMyRiskIndex();
  })
  .controller('StorageCtrl', ['$scope', 'LocalStorageService', function($scope, LocalStorageService) {
    $scope.toggleTrack = LocalStorage.get('tracking');

    $scope.pushTrack = function() {
      console.log('got into pushTrack');
      if (LocalStorage.get('tracking') === 'false') {
        LocalStorage.setItem('tracking', 'true');
        console.log(LocalStorage.get('tracking'));
      }
      else {
        LocalStorage.setItem('tracking', 'false');
        console.log(LocalStorage.get('tracking'));
      }
    };
  }]);
