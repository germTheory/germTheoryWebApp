var express = require('express');

// var dbConfig = require('./dbConfig.example.js');
// var knex = require('knex')(dbConfig);
// var bookshelf = require('bookshelf')(knex);

var app = express();

// to use bookshelf elsewhere in the app, simply write 'var bookshelf = app.get('bookshelf');'
// app.set('bookshelf', bookshelf);

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
module.exports = app;