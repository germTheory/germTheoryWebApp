module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      // angular source
      '../bower_components/angular/angular.js',
      '../bower_components/angular-animate/angular-animate.js',
      '../bower_components/angular-sanitize/angular-sanitize.js',
      '../bower_components/angular-ui-router/release/angular-ui-router.js',
      '../bower_components/angular-moment/angular-moment.js',
      '../bower_components/angular-native-picker/build/angular-datepicker.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../bower_components/ionic/js/ionic.js',
      '../bower_components/ionic/js/ionic-angular.js',
      '../bower_components/ngCordova/dist/ng-cordova.js',

      // our app code
      'www/js/**/*.js',

      // our spec files
      '../node_modules/expect.js/index.js',
      '../specs/mobile/**/*.js'
    ],

    exclude: [
      'karma.conf.js'
    ],

    preprocessors: {},

    reporters: ['progress', 'nyan'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Chrome', 'PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
