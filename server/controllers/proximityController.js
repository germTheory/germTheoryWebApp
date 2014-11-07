var db = require('../database/dbSchema.js'),
  Proximity = db.Proximity,
  User = db.User;

var _getUserCode = function (req, res, next, code){
  // check if code exists in user table. if it does, add it to the request
  User.find(code)
    .success(function(){
      req.body.user_id = code;
      next();
    })
    .error(function(err){
      res.send(404, err);
    });
};

var _invalidMethod = function(req, res) {
  res.send(405, "Invalid Method for API endpoint");
};


// Create new entry in proximity table.  Accessed via '/api/proximity' and '/api/proximity/:user_id'
var _newUserIndex = function(req, res) {
  if( !req.body.user_id ) {
    res.send(400, "Bad Request: Did not supply a user_id in url or in request body");
  }
  var indexValue = req.body.value;
  var disease = req.body.disease_id;
  // create new proximity entry in the table. Note: no error handling for existing entries for a given user
  Proximity
    .create({user_id: req.body.user_id, value: indexValue, disease_id: disease})
    .success(function(entry){
      res.send(201, "Successfully added item to proximity table.");
    })
    .error(function(err){
      res.send(err);
    });
};

var _updateUserIndex = function(req, res) {
  if( !req.body.user_id ) {
    res.send(400, "Bad Request: Did not supply a user_id in url or in request body");
  }
  var indexValue = req.body.value;
  // Find entry in database and update with new value and disease_id
  Proximity
    .find({ where: { user_id: req.body.user_id } })
    .success( function( proximity ){
      proximity.updateAttributes({ value: indexValue }, ['value'])
        .success(function(item) {
          res.send(200, item);
        })
        .error(function(err){
          res.send(500, err);
        });
    })
    .error(function(err){
      res.send(404, err);
    });
};

var _getAllIndexes = function(req, res) {

};

var _deleteUserIndex = function(req, res) {

};

module.exports = {
  invalidMethod: _invalidMethod,
  getUserCode: _getUserCode,
  newUserIndex: _newUserIndex,
  updateUserIndex: _updateUserIndex,
  getAllIndexes: _getAllIndexes,
  _deleteUserIndex: _deleteUserIndex
};