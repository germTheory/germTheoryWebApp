var db = require('database/dbSchema.js'),
	Proximity = db.Proximity,
  User = db.User;

var _getUserCode = function (req, res, next, code){
  // check if code exists in user table. if it does, add it to the request
  User.find(code).success(function(){
    req.body.user_id = code;
    next();
  });
};

var _invalidMethod = function(req, res) {
  res.send(405, "Invalid Method for API endpoint");
};

var _newUserIndex = function(req, res) {
  if( !req.body.user_id ) {
    res.send(400, "Bad Request: Did not supply a user_id in url or in request body");
  }
}


module.exports = {
  invalidMethod: _invalidMethod,
  getUserCode: _getUserCode
}