var dbCreds = require('./dbCreds.js');
var knex = require('knex')(dbCreds);
var db = require('bookshelf')(knex);

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

db.knex.schema.hasTable('location').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('location', function (location) {
      location.integer('user_id')
      		    .references('id')
              .inTable('users');
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

db.knex.schema.hasTable('user_disease').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('user_disease', function (user_disease) {
      user_disease.integer('user_id')
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
      prox.integer('user_id')
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