var db = require('../database/dbSchema.js'),
  Proximity = db.Proximity,
  User = db.User;

// process params to ensure that the specified user exists
var _getUserCode = function (req, res, next, code){
  // check if code exists in user table. if it does, add it to the request
  User.find(code)
    .then(function( user, err ){
      if(err) {
        res.status(404).send(err);
      }
      req.body.user_id = code;
      next();
    });
};

// return a 405 if the API does not support the desired function
var _invalidMethod = function(req, res, next){
  res.status(405).send("Invalid Method for API endpoint");
};

// Return the index value for the requested user
var _getUserIndex = function(req, res, next){
  Proximity
    .find({ where: { user_id: req.body.user_id } })
    .then(function( userEntry, err ){
      if(err) {
        res.send(err);
      }
      res.status(200).send(userEntry);
    });
}

// Create new entry in proximity table.  Accessed via '/api/proximity' and '/api/proximity/:user_id'
var _newUserIndex = function(req, res, next){
  if( !req.body.user_id ) {
    res.status(400).send("Bad Request: Did not supply a user_id in url or in request body");
  }
  var indexValue = req.body.value;
  var disease = req.body.disease_id;
  // create new proximity entry in the table. Note: no error handling for existing entries for a given user
  Proximity
    .create({user_id: req.body.user_id, value: indexValue, disease_id: disease})
    .then(function(entry, err){
      if(err){
        res.send(err);
      }
      res.status(201).send("Successfully added item to proximity table.");
    });
};

// Update an existing index in the proximity table
var _updateUserIndex = function(req, res, next) {
  if( !req.body.user_id ) {
    res.status(400).send("Bad Request: Did not supply a user_id in url or in request body");
  }
  var indexValue = req.body.value;
  // Find entry in database and update with new value and disease_id
  Proximity
    .find({ where: { user_id: req.body.user_id } })
      .then( function( proximity, err ){
        if(err){
          res.status(404).send(err);
        }
        proximity.updateAttributes({ value: indexValue }, ['value'])
          .then(function( item, error ) {
            if(error){
              res.status(500).send(err);
            }
            res.status(200).send(item);
          });
      });
};

// Return all indexes in the table
var _getAllIndexes = function(req, res, next) {
  Proximity
    .findAll()
      .then( function( table ){
        res.status(200).send(table);
      });
};

// delete all of a single user's indexes in the table
var _deleteUserIndex = function(req, res, next) {
  if( !req.body.user_id ) {
    res.status(400).send("Bad Request: Did not supply a user_id in url or in request body");
  }
  Proximity
    .destroy( { user_id: req.body.user_id } )
      .then( function( affectedRows, err ){
        if(err){
          res.status(500).send(err);
        }
        res.status(200).send(affectedRows);
      });
};

// Export our runctions to be used elsewhere
module.exports = {
  invalidMethod: _invalidMethod,
  getUserCode: _getUserCode,
  getUserIndex: _getUserIndex,
  newUserIndex: _newUserIndex,
  updateUserIndex: _updateUserIndex,
  getAllIndexes: _getAllIndexes,
  deleteUserIndex: _deleteUserIndex
};