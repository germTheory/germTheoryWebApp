angular.module('app', [
  'ionic',
  'ngCordova',
  'app.controllers.common',
  'app.controllers.settings',
  'app.controllers.user',
  'app.services.common',
  'app.services.geo-location',
  'app.services.settings',
  'app.services.auth',
  'app.directives.map'])

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
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
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl'
          }
        }
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'templates/signin.html',
        controller: 'UserCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'UserCtrl'
      });

    $urlRouterProvider.otherwise('/signin');

    // Add our $httpInterceptor into the array of interceptors here
    $httpProvider.interceptors.push('AuthInterceptor');
  })

  .run(function ($ionicPlatform, $rootScope, $location, AuthService) {
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

    // Check if a user is authenticated here before moving to a new state
    // If auth-token is not present, redirect to 'signin' state unless next state is either 'signin' or 'signout'
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      if (!(toState.name === 'signin' || toState.name === 'signup') && !AuthService.isAuthenticated()) {
        $location.path('/signin');
      }
    });
  });
