var express = require('express');
var app = express();
var port = process.env.PORT || 4568;

require('./config/serverConfig.js')(app, express);

app.listen(port);

console.log('Server now listening on port ' + port);
