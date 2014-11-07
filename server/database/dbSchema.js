var dbCreds   = require('./dbCreds');
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var sequelize = new Sequelize(dbCreds.database, dbCreds.username, dbCreds.password, {
	dialect: 'postgres',
	port: 5432,
	define: {
		underscored: true
	},
  logging: false
});
var db = {}; // stores all models that we will export

// Location table schema
var Location = sequelize.define('location', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  latitude: { type: Sequelize.FLOAT },
  longitude: { type: Sequelize.FLOAT },
}, {
  tableName: 'locations'
});

// Diseases table schema
var Disease = sequelize.define('disease', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING },
}, {
  tableName: 'diseases'
});

// User table schema
var User = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
}, {
  tableName: 'users'
});

// Proximity table schema
var Proximity = sequelize.define('proximity', {
  value: { type: Sequelize.FLOAT },
}, {
  tableName: 'proximity'
});

/*
DEFINE RELATIONSHIPS
*/
// Has many relationships
User.hasMany(Location);
Disease.hasMany(Proximity);

// has one relationships
User.hasOne(Proximity);

// Build join table between users and diseases
Disease.hasMany(User, { joinTableName: 'user_diseases' });
User.hasMany(Disease, { joinTableName: 'user_diseases' });

// Authenticate, connect, and create tables if they are not already defined
sequelize
.authenticate()
.complete(function(err){
  if(err){
    console.log('Unable to connect to database: ', err);
  } else {
    console.log('Established connection to database.');
    sequelize.sync();
  }
});

// Assign keys to be exported
db.Location = Location;
db.Disease = Disease;
db.User = User;
db.Proximity = Proximity;
db.sequelize = sequelize;
module.exports = db;
