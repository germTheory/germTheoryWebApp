var express = require('express');

// var dbConfig = require('./config/dbConfig.js');
// var knex = require('knex')(dbConfig);
// var bookshelf = require('bookshelf')(knex);

var app = express();

// to use bookshelf elsewhere in the app, simply write 'var bookshelf = app.get('bookshelf');'
// app.set('bookshelf', bookshelf);

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);

var port = process.env.PORT || 4568;

app.listen(port);

console.log('Server now listening on port ' + port);