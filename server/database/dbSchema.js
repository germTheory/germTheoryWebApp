var dbCreds   = require('./dbCreds');
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var sequelize = new Sequelize(dbCreds.database, dbCreds.username, dbCreds.password, {
	dialect: 'postgres',
	port: 5432
});
var db = {}; // stores all methods

// Location table schema
var Locations = sequelize.define('Locations', {
	tableName: 'locations',
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	latitude: { type: Sequelize.FLOAT },
	longitude: { type: Sequelize.FLOAT },
});

Locations.sync();

// Diseases table schema
var Diseases = sequelize.define('Diseases', {
	tableName: 'diseases',
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING },
});

Diseases.sync();


// User table schema
var Users = sequelize.define('Users', {
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
Users
	.hasMany(Locations, { foreignKey: 'userId', foreignKeyConstraint: true });

// Build join table between users and diseases
Diseases
	.hasMany(Users, { joinTableName: 'user_diseases' });
Users
	.hasMany(Diseases, { joinTableName: 'user_diseases' });

// Proximity Relationships
Proximity
	.hasOne(Users, { foreignKey: 'userId', foreignKeyConstraint: true });
Proximity
	.hasOne(Diseases, { foreignKey: 'diseaseId', foreignKeyConstraint: true });


sequelize
	.authenticate()
	.complete(function(err){
		if(err){
			console.log("Unable to connect to database: ", err);
		} else {
			console.log("Established connection to database.");
		}
	});

db['Locations'] = Locations;
db['Diseases'] = Diseases;
db['Users'] = Users;
db['Proximity'] = Proximity;

module.exports = db;