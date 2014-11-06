var pg = require('pg');
var request = require("request");
var expect = require('../../node_modules/chai/chai').expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      // TODO: Fill this out with your mysql username
      user: "root",
      // and password.
      password: "",
      database: "chat"
    });
    dbConnection.connect();

    var tablename = "Messages"; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */

    dbConnection.query("truncate " + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:
    request({method: "POST",
        uri: "http://127.0.0.1:3000/classes/messages",
        json: {username: "Valjean",
          message: "In mercy's name, three days is all I need.",
          roomname: "Hello"}
      },
      function () {
        /* Now if we look in the database, we should find the
         * posted message there. */

        var queryString = 'select * from Messages, Users where Messages.UserId = Users.id and users.username = ?'
        var queryArgs = ["Valjean"];
        /* TODO: Change the above queryString & queryArgs to match your schema design
         * The exact query string and query args to use
         * here depend on the schema you design, so I'll leave
         * them up to you. */
        dbConnection.query( queryString, queryArgs,
          function(err, results) {
            // Should have one result:
            expect(results.length).to.equal(1);
            expect(results[0].text).to.equal("In mercy's name, three days is all I need.");
            /* TODO: You will need to change these tests if the
             * column names in your schema are different from
             * mine! */

            done();
          });
      });
  });

  it("Should output all messages from the DB", function(done) {


    // Let's insert a message into the db

    /* TODO - The exact query string and query args to use
     * here depend on the schema you design, so I'll leave
     * them up to you. */

    dbConnection.query('insert into Users (username) values (?)', ['Josh'], function(err, result) {
      if (err) {
        throw err;
      } else {

        var queryString = 'insert into Messages (text, UserId) values (?, ?)';
        var queryArgs = ['Men like you can never change!', result.insertId];

        dbConnection.query( queryString, queryArgs,
          function(err) {
            if (err) { throw err; }
            /* Now query the Node chat server and see if it returns
             * the message we just inserted: */
            request("http://127.0.0.1:3000/classes/messages",
              function(error, response, body) {
                var messageLog = JSON.parse(body);
                console.log(messageLog)
                expect(messageLog.results[0].text).to.equal("Men like you can never change!");
                expect(messageLog.results[0].roomname).to.equal("Lobby");
                done();
              });
          });
      }
    });


  });
});

