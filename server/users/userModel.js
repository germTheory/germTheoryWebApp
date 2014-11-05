var bcrypt   = require('bcrypt-nodejs'),
    Q        = require('q'),
    // bookshelf = app.get('bookshelf');
    SALT_WORK_FACTOR  = 10;

// BOOKSHELF SCHEMA HERE
// var Users = bookshelf.Model.extend({
//   tableName: 'users',
//   constructor: function() {
//     bookshelf.Model.apply(this, arguments);
//     this.on('saving', function(model, attrs, options) {
//     });
//   }
// });

//TODO: Implement addUser and add to bookshelf, likely using Google OAUTH and jwt
var _addUser = function(data){

}
// TODO: Implement findUser
var _findUser = function(params){

}

// TODO: Implement FetchUserLocations
var _fetchUserLocations = function(){

}


module.exports = {
	addUser: _addUser,
	findUser: _findUser,
	fetchUserLocations: _fetchUserLocations
}; 
// EVENTUAL EXPORTS: bookshelf.model('Users', Users);
