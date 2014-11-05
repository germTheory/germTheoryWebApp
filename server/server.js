var express = require('express');

var app = express();

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
module.exports = app;