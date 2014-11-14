var Sequelize = require('sequelize');
var username = process.env.DB_USER || 'postgres';
var password = process.env.DB_PASSWORD || 'postgres';
var database = process.env.DB_NAME || 'germtracker';
var host = process.env.DB_HOST || 'localhost';
var is_native = false;

var connection_string = 'postgres://' + username + ':' + password + '@' + host + ':5432/' + database;

if (process.env.NODE_ENV === 'production'){
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

/*** DEFINE TABLES ***/

var User = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
  token: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING },
  google_id: { type: Sequelize.STRING }
}, {
  tableName: 'users'
});

var Location = sequelize.define('location', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  latitude: { type: Sequelize.FLOAT, allowNull: false },
  longitude: { type: Sequelize.FLOAT, allowNull: false },
  date: { type: Sequelize.DATE, allowNull: false }
}, {
  tableName: 'locations'
});

var Disease = sequelize.define('disease', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false }
}, {
  tableName: 'diseases'
});

var Proximity = sequelize.define('proximity', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	value: { type: Sequelize.FLOAT, allowNull: false }
}, {
  tableName: 'proximity'
});

var ReportedCase = sequelize.define('reported_case', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  description: { type: Sequelize.STRING },
  date: { type: Sequelize.DATE, allowNull: false },
  latitude: { type: Sequelize.FLOAT, allowNull: false },
  longitude: { type: Sequelize.FLOAT, allowNull: false }
}, {
  tableName: 'reported_cases'
});

/*** DEFINE RELATIONSHIPS ***/

User.hasMany(Location, {
  foreignKey: {
    name: 'user_id',
    allowNull: false
  }
});
Location.belongsTo(User);

User.hasMany(Proximity);
Disease.hasMany(Proximity);
Proximity.belongsTo(User);
Proximity.belongsTo(Disease);

Disease.hasMany(User, { joinTableName: 'user_diseases' });
User.hasMany(Disease, { joinTableName: 'user_diseases' });

Disease.hasMany(ReportedCase);
ReportedCase.belongsTo(Disease);

/*** Authenticate, connect, and create tables if they are not already defined ***/

sequelize
  .authenticate()
  .complete(function(err) {
    if (err)
      throw err;

    sequelize.sync();
    console.log('Established connection to database.');
  });


/* Saves the user to the database. */
var saveUser =  function(user, cb){
  var newUser = User.build({name: user.name, gender: user.gender, token: user.token, email: user.email, password: user.password});
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
	User.findAll({ where: {name: user.email, gender: user.gender, token: user.token, email: user.email} }).complete(function(err, usrs) {
	  if (!!err){
	    console.log('An error occurred while finding User: ', user.name);
	  } else {
	    // This function is called back with an array of matches.
	    // console.log("findUser list of users: ", usrs, user.name, user.gender);
	    cb(usrs, {name: user.name, gender: user.gender, token: user.token, email: user.email});
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
      console.log('An error occurred while finding User: ', id);
    } else {
      // This function is called back with an array of matches.
      // console.log("findUser list of users: ", usrs);
      cb(usrs);
    }
  });
};

module.exports = {
  Location: Location,
  Disease: Disease,
  User: User,
  Proximity: Proximity,
  ReportedCase: ReportedCase,
  sequelize: sequelize, // we expose this for testing
  saveUser: saveUser,
  findUser: findUser,
  findUserById: findUserById,
  findAllUsers: findAllUsers
};
