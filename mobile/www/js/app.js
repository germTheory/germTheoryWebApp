angular.module('app', ['ionic', 'ngCordova', 'app.controllers', 'app.services'])

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

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })

      // Each tab has its own nav history stack:
      .state('tab.menu', {
        url: '/menu',
        views: {
          'tab-menu': {
            templateUrl: 'templates/menu.html',
            controller: 'MenuCtrl'
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
            controller: 'GeoCtrl'
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
      });

    $urlRouterProvider.otherwise('/tab/login');
  });
