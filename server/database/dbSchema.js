var dbCreds   = require('./dbCreds');
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';


/*Database connection string created depending of whether
  it is a development or deployment environment.*/
var is_native = false;

var connection_string = dbCreds.dialect + '://' + dbCreds.username + ':' + dbCreds.password + 
                        '@' + dbCreds.host + ':5432/' + dbCreds.database;

if (process.env.NODE_ENV){
  connection_string =  process.env.DATABASE_URL;
  is_native = true;
}

// console.log("connection_string: ", connection_string);

var sequelize = new Sequelize(connection_string, {
  define: {
    underscored: true
  },
  logging: console.log,
  logging: false,
  protocol: 'postgres',
  native: is_native
});

var db = {}; // stores all models that we will export

// Location table schema
var Location = sequelize.define('location', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
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
User.hasMany(Location,{
  foreignKey: {
    name: 'user_id',
    allowNull: false
  }
});
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


/* Saves the user to the database.
  */
var saveUser =  function(_username, cb){
  var newUser = User.build({name: _username, gender:"none"});
  newUser.save().complete(function(err) {
    if (!!err){
    console.log('An error occured while saving User: ', _username);
    } else {

      /* This callback function is called once saving succeeds. */
      console.log("User saved: ", _username);
      cb(_username);
    }
  });
  
};

var findUser = function(_username, cb){
// Retrieve user from the database:
	User.findAll({ where: {name: _username} }).complete(function(err, usrs) {
	                // attributes: [name, gender] }).complete(function(err, usrs) {
	  if (!!err){
	    console.log('An error occured while finding User: ', _username);
	  } else {
	    // This function is called back with an array of matches.
	    // console.log("findUser list of users: ", usrs[0].dataValues);
	    cb(usrs[0].dataValues);
	  }
	});
};

// Assign keys to be exported
db.Location = Location;
db.Disease = Disease;
db.User = User;
db.Proximity = Proximity;
db.sequelize = sequelize;
db.saveUser = saveUser;
db.findUser = findUser;
module.exports = db;
