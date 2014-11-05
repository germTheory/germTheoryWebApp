var Bookshelf = require('bookshelf');
var path = require('path');

db = Bookshelf.initialize({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'your_database_user',
    password : 'your_database_password',
    database : 'germTheorydb',
    charset  : 'utf8',
    ssl      : true
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('name', 255);
      user.string('gender', 10);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('diseases').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('diseases', function (disease) {
      disease.increments('id').primary();
      disease.string('name', 255);
      disease.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('locations').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('locations', function (location) {
      location.integer('user_id')
      		    .references('id')
              .inTable('users'));
      location.float('longitude');
      location.float('latitude');
      // timestamp needs: time when geolocation was obtained + 
      // time when info. was inserted to DB.
      location.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('user_diseases').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('user_diseases', function (user_disease) {
      user_disease.increments('user_id')
                  .references('id')
                  .inTable('users');
      user_disease.integer('disease_id')
                  .references('id')
                  .inTable('diseases');
      user_disease.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('proximity').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('proximity', function (prox) {
      prox.increments('user_id')
                  .references('id')
                  .inTable('users');
      prox.integer('disease_id')
                  .references('id')
                  .inTable('diseases');
      prox.float('value');
      prox.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
