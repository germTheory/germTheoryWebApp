var request = require("request");
var expect = require('chai').expect;
var Sequelize = require("sequelize");

xdescribe('User REST resource',function(){

  var sequelize;

  beforeEach(function() {
    var DBUser = process.env.DB_USER || 'postgres';
    var DBName = process.env.DB_NAME || 'germtracker';

    sequelize = new Sequelize(DBUser, DBName, null, {
      dialect: 'postgres'
    });
  });

  it('GET /api/users should return a list of User records', function(done) {
    request("http://127.0.0.1:4568/api/users",
      function(err, res, body) {
        var users = JSON.parse(body);
        console.log(users);
        expect(users.length).not.to.be.equal(0);
        done();
      });
  });

  it('GET /api/user/:id should return a specified User record', function(done){
    sequelize.query("INSERT INTO users VALUES (?, ?)", null, null, ['John Smith', 'M'])
      .success(function(user) {
        console.log(user);

        request("http://127.0.0.1:4568/api/users/" + user.id,
          function(err, res, body) {
            console.log(body);
            expect(body.length).to.be.equal(1);
            expect(body.name).to.be.equal('John Smith');
            done();
          });
      });
  });

  it('POST /api/user should insert a new User record', function(done) {
    request({method: "POST",
        uri: "http://127.0.0.1:4568/api/users",
        json: {
          name: "John",
          gender: "M"
        }
      },
      function(err, res, body) {
        var name = body.name;
        sequelize.query("SELECT * FROM users WHERE name = :name", null, null, {name: name})
          .success(function(result) {
            console.log(result);
            expect(result.length).to.be.equal(1);
            expect(result.name).to.be.equal("John");
            done();
          });
      });
  });

  xit('should add a user to the database', function(done) {
    describe('GET /users', function(){
      it('respond with json', function(done){
        request(app)
          .get('/user')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
      });
    });
  });
});