var bcrypt   = require('bcrypt-nodejs'),
    Q        = require('q'),
    Bookshelf = require('bookshelf');
    SALT_WORK_FACTOR  = 10;

var Users = Bookshelf.Model.extend({

  tableName: 'documents',

  constructor: function() {
    bookshelf.Model.apply(this, arguments);
    this.on('saving', function(model, attrs, options) {
      options.query.where('type', '=', 'book');
    });
  }

});

//TODO: Implement addUser, likely using Google OAUTH and jwt
var addUser = function(data){

}
// TODO: Implement findUser
var _findUser = function(params){

}

// TODO: Implement FetchUserLocations
var _fetchUserLocations = function(){

}


module.exports = Bookshelf.model('Users', Users);
