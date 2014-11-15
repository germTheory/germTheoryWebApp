var Proximity = require('../database/dbSchema.js').Proximity;
var User = require('../database/dbSchema.js').User;
var Disease = require('../database/dbSchema.js').Disease;

// process params to ensure that the specified user exists
var _getUserCode = function(req, res, next, code) {
  // check if code exists in user table. if it does, add it to the request
  User.find(code)
    .then(function() {
      req.body.user_id = code;
      next();
    }, function(err) {
      res.status(404).send(err);
    });
};

var _getDiseaseId = function(req, res, next, code) {
  Disease.find({ where: { id: code } })
    .then(function() {
      req.body.disease_id = code;
      next();
    }, function(err) {
      res.status(404).send(err);
    });
};

// return a 405 if the API does not support the desired function
var _invalidMethod = function(req, res, next) {
  res.status(405).send("Invalid Method for API endpoint");
};

// Return the index value for the requested user
var _getUserIndex = function(req, res, next) {
  Proximity
    .findAll({ where: { user_id: req.body.user_id } })
    .then(function(userEntry) {
      res.status(200).send(userEntry);
    }, function(err) {
      res.send(err);
    });
};

// Create new entry in proximity table.  Accessed via '/api/proximity' and '/api/proximity/:user_id'
var _newUserIndex = function(req, res, next) {
  if (!req.body.user_id) {
    res.status(400).send("Bad Request: Did not supply a user_id in url or in request body");
  }
  var indexValue = req.body.value;
  var disease = req.body.disease_id;

  // create new proximity entry in the table. Note: no error handling for existing entries for a given user
  Proximity
    .create({ user_id: req.body.user_id, value: indexValue, disease_id: disease })
    .then(function(entry) {
      res.status(201).send(entry);
    }, function(err) {
      res.status(400).send(err);
    });
};

// Update an existing index in the proximity table
var _updateUserIndex = function(req, res, next) {
  if (!req.body.user_id) {
    res.status(400).send("Bad Request: Did not supply a user_id in url or in request body");
  }

  var indexValue = req.body.value;
  // Find entry in database and update with new value and disease_id
  Proximity
    .find({ where: { user_id: req.body.user_id } })
    .then(function(proximity) {
      proximity.updateAttributes({ value: indexValue }, ['value'])
        .then(function(item) {
          res.status(200).send(item);
        }, function(err) {
          res.status(500).send(err);
        });
    }, function(err) {
      res.status(404).send(err);
    });
};

// Return all indexes in the table
var _getAllIndexes = function(req, res, next) {
  Proximity
    .findAll()
    .then(function(table) {
      res.status(200).send(table);
    });
};

// delete all of a single user's indexes in the table
var _deleteUserIndex = function(req, res, next) {
  if (!req.body.user_id) {
    res.status(400).send("Bad Request: Did not supply a user_id in url or in request body");
  }

  Proximity
    .destroy({ where: { user_id: req.body.user_id } })
    .then(function(affectedRows) {
      res.status(200).send(affectedRows);
    }, function(err) {
      res.status(500).send(err);
    });
};

var _getDiseaseIndexes = function(req, res, next) {
  if (!req.body.disease_id) {
    res.status(400).send("Bad Request: Did not supply a disease_id in url");
  }

  Proximity
    .findAll({ where: { disease_id: req.body.disease_id } })
    .then(function(data) {
      res.status(200).send(data);
    }, function(err) {
      res.status(500).send(err);
    });
};

// Export our runctions to be used elsewhere
module.exports = {
  invalidMethod: _invalidMethod,
  getUserCode: _getUserCode,
  getDiseaseId: _getDiseaseId,
  getUserIndex: _getUserIndex,
  newUserIndex: _newUserIndex,
  updateUserIndex: _updateUserIndex,
  getDiseaseIndexes: _getDiseaseIndexes,
  getAllIndexes: _getAllIndexes,
  deleteUserIndex: _deleteUserIndex
};