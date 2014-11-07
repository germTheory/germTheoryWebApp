var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var dbUser    = process.env.DB_USER || 'postgres';
var dbPassword = process.env.DB_PASSWORD || 'postgres';
var dbName    = process.env.DB_NAME || 'germtracker';

var sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	dialect: 'postgres',
	port: 5432,
	define: {
		underscored: true
	},
  logging: false
});

var Location = sequelize.define('location', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  latitude: {type: Sequelize.FLOAT},
  longitude: {type: Sequelize.FLOAT}
}, {
  tableName: 'locations'
});

var Disease = sequelize.define('disease', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.STRING}
}, {
  tableName: 'diseases'
});

var User = sequelize.define('user', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.STRING},
  gender: {type: Sequelize.STRING}
}, {
  tableName: 'users'
});


var Proximity = sequelize.define('proximity', {
  value: {type: Sequelize.FLOAT}
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
module.exports.db = {
  Location: Location,
  Disease: Disease,
  User: User,
  Proximity: Proximity,
  sequelize: sequelize
};
