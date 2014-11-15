angular.module('app', ['ionic', 'ngCordova', 'app.controllers', 'app.directives', 'app.geo-controller','app.services', 'app.utils'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  // .run(function($localstorage) {

  //   $localstorage.set('name', 'Max');
  //   console.log($localstorage.get('name'));
  //   $localstorage.setObject('post', {
  //     name: 'Thoughts',
  //     text: 'Today was a good day'
  //   });

  //   var post = $localstorage.getObject('post');
  //   console.log(post);
  // })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })
      .state('tab.map', {
        url: '/map',
        views: {
          'tab-map': {
            templateUrl: 'templates/map.html',
            controller: 'MapCtrl'
          }
        }
      })
      .state('tab.myrisk', {
        url: '/myrisk',
        views: {
          'tab-myrisk': {
            templateUrl: 'templates/myrisk.html',
            controller: 'MyRiskCtrl'
          }
        }
      })
      .state('tab.report', {
        url: '/report',
        views: {
          'tab-report': {
            templateUrl: 'templates/report.html',
            controller: 'ReportCtrl'
          }
        }
      })
      .state('tab.menu-detail', {
        url: '/menu/:optionId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/menu-detail.html',
            controller: 'MenuDetailCtrl'
          }
        }
      })
      .state('tab.login', {
        url: '/login',
        views: {
          'tab-login': {
            templateUrl: 'templates/login.html',
            controller: 'AuthCtrl'
          }
        }
      })
      .state('tab.track', {
        url: '/track',
        views: {
          'tab-track': {
            templateUrl: 'templates/track.html',
            controller: 'BkGeoLocCtrl'
          }
        }
      })
      .state('tab.stop', {
        url: '/stop',
        views: {
          'stop': {
            templateUrl: 'templates/stop.html',
            controller: 'StopGeoLocCtrl'
          }
        }
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'templates/settings.html',
        controller: 'StorageCtrl'
      });

    $urlRouterProvider.otherwise('/tab/login');
  });
