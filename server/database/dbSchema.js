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
  latitude: { type: Sequelize.FLOAT, allowNull: false },
  longitude: { type: Sequelize.FLOAT, allowNull: false }
}, {
  tableName: 'locations'
});

// Diseases table schema
var Disease = sequelize.define('disease', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false }
}, {
  tableName: 'diseases'
});

// User table schema
var User = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false},
  gender: { type: Sequelize.STRING }
}, {
  tableName: 'users'
});

// Proximity table schema
var Proximity = sequelize.define('proximity', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	value: { type: Sequelize.FLOAT, allowNull: false }
}, {
  tableName: 'proximity'
});

/*
DEFINE RELATIONSHIPS
*/

User.hasMany(Location, {
  foreignKey: {
    name: 'user_id',
    allowNull: false
  }
});
Location.belongsTo(User);

// Proximity has one-to-many relationships with User and Disease
User.hasMany(Proximity);
Disease.hasMany(Proximity);
Proximity.belongsTo(User);
Proximity.belongsTo(Disease);


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
var saveUser =  function(user, cb){
  var newUser = User.build({name: user.name, gender: user.gender});
  newUser.save().complete(function(err, usr) {
    if (!!err){
    console.log('An error occured while saving User: ', err);
    } else {

      /* This callback function is called once saving succeeds. */
      //console.log("User saved: ", usr.dataValues);
      cb(usr.dataValues);
    }
  });
};

var findUser = function(user, cb){
	User.findAll({ where: {name: user.name, gender: user.gender} }).complete(function(err, usrs) {
	  if (!!err){
	    console.log('An error occured while finding User: ', user.name);
	  } else {
	    // This function is called back with an array of matches.
	    // console.log("findUser list of users: ", usrs, user.name, user.gender);
	    cb(usrs, {name: user.name, gender: user.gender});
	  }
	});
};

var findAllUsers = function(cb){
  User.findAll().complete(function(err, users) {
    cb(err, users);
  });
};

var findUserById = function(id, cb){
  User.findAll({ where: {id: id} }).complete(function(err, usrs) {
    if (!!err){
      console.log('An error occured while finding User: ', id);
    } else {
      // This function is called back with an array of matches.
      // console.log("findUser list of users: ", usrs);
      cb(usrs);
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
db.findUserById = findUserById;
db.findAllUsers = findAllUsers;
module.exports = db;
