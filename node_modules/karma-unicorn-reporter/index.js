var UnicornReporter = function(baseReporterDecorator) {
  baseReporterDecorator(this);

  this.onBrowserComplete = function(browser) {
    var results = browser.lastResult;

    if(results.success) {
      require('child_process').exec("./node_modules/.bin/unicornleap")
    }
  };
}

UnicornReporter.$inject = ['baseReporterDecorator', 'formatError']

module.exports = {
  'reporter:unicorn': ['type', UnicornReporter]
};
