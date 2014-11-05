var express = require('express');

var dbCreds = require('./config/dbCreds_example.js');
var knex = require('knex')(dbCreds);
var bookshelf = require('bookshelf')(knex);

var app = express();

// to use bookshelf elsewhere in the app, simply write 'var bookshelf = app.get('bookshelf');'
app.set('bookshelf', bookshelf);
app.set('knex', knex);

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);

// configure our server with the knex schema setup
require('./config/dbConfig.js')(app);

// set port
var port = process.env.PORT || 4568;

app.listen(port);

console.log('Server now listening on port ' + port);
