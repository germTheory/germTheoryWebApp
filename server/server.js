var express = require('express');
var db = require('./config/dbSchema.js');

var app = express();

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);

var port = process.env.PORT || 4568;

app.listen(port);

console.log('Server now listening on port ' + port);