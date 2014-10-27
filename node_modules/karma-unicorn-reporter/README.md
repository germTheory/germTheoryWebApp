# karma-unicorn-reporter

> Report test results using unicorns

## Installation

The easiest way is to keep `karma-unicorn-reporter` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-unicorn-reporter": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-unicorn-reporter --save-dev
```

###

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    reporters: ['progress', 'unicorn'],
  });
};
```

You can pass list of reporters as a CLI argument too:
```bash
karma start --reporters unicorn,dots
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
