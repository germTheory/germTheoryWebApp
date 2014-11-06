var dbCreds   = require('./dbCreds');
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var sequelize = new Sequelize(dbCreds.database, dbCreds.username, dbCreds.password, {
	dialect: 'postgres',
	port: 5432
});
var db = {}; // stores all methods

// Location table schema
var Location = sequelize.define('Location', {
	tableName: 'locations',
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	latitude: { type: Sequelize.FLOAT },
	longitude: { type: Sequelize.FLOAT },
});

Locations.sync();

// Diseases table schema
var Disease = sequelize.define('Disease', {
	tableName: 'diseases',
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING },
});

Diseases.sync();


// User table schema
var User = sequelize.define('User', {
  tableName: 'users',
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
});

Users.sync();

// Proximity table schema
var Proximity = sequelize.define('Proximity', {
	tableName: 'proximity',
	value: { type: Sequelize.FLOAT },
});

Proximity.sync();

/*
DEFINE RELATIONSHIPS
*/
User
	.hasMany(Location, { foreignKey: 'userId', foreignKeyConstraint: true });

// Build join table between users and diseases
Disease
	.hasMany(User, { joinTableName: 'user_diseases' });
User
	.hasMany(Disease, { joinTableName: 'user_diseases' });

// Proximity Relationships
Proximity
	.hasOne(User, { foreignKey: 'userId', foreignKeyConstraint: true });
Proximity
	.hasOne(Disease, { foreignKey: 'diseaseId', foreignKeyConstraint: true });


sequelize
	.authenticate()
	.complete(function(err){
		if(err){
			console.log("Unable to connect to database: ", err);
		} else {
			console.log("Established connection to database.");
		}
	});

db['Location'] = Location;
db['Disease'] = Disease;
db['User'] = User;
db['Proximity'] = Proximity;

module.exports = db;