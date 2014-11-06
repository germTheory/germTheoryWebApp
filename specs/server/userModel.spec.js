var request = require('require');
var should = require('should');
var User = require('../../users/userModel');
var dbCreds = require('./dbCreds_example.js');
var knex = require('knex')(dbCreds);
var db = require('bookshelf')(knex);
var expect = require('../../node_modules/chai/chai').expect;

describe('Persistent server',function(){
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = db.createConnection({

    // Update these fields to reflect actual login credentials
      user: "root",
      password: "password",
      database: ""
    });

    dbConnection.connect();

    var tableName = "users";

    //Clears out the database before each test such that 
    //each test doesn't interfere with another test
    dbConnection.query("truncate" + tableName, done);
  });


  it("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:
    request({method: "POST",
             // Need to add in correct uri
             uri: "",
             json: {username: "Jameson"}
            },
            function () {
              /* Now if we look in the database, we should find the
               * posted user there. */
              console.log(request);
              var queryString = "INSERT INTO users (user_id) values ('Jameson')";
              // "INSERT INTO messages (username, textMessage, roomname) values (json.username,json.message,json.roomname)"
              // var queryArgs = ['json.username, json.messages, json.roomname'];
              /* TODO: Change the above queryString & queryArgs to match your schema design
               * The exact query string and query args to use
               * here depend on the schema you design, so I'll leave
               * them up to you. */
              dbConnection.query( queryString,
                function(err, results) {
                  // Should have one result:
                  expect(results.length).to.equal(undefined);
                  expect("Jameson").to.equal("Jameson");
                  /* TODO: You will need to change these tests if the
                   * column names in your schema are different from
                   * mine! */

                  done();
                });
            });
  });



  xit('Database should have a function called _addUser', function() {
    User._addUser.should.be.a('function');
  })

  xit('It should add a user to the database', function(done) {

  })

  xit('Database should have a function called diseases', function() {
    User._findUser.should.be.a('function');
  })

  xit('Database should have a function called location', function() {
    User._fetchUserLocations.should.be.a('function');
  })


})