var request = require('supertest');
var expect = require('chai').expect;
var db = require('../../server/database/dbSchema.js');

xdescribe('User REST resource',function(){
  var app;

  before(function(done){
    db.sequelize.sync({force: true})
      .success(function(){
        done();
      });
    app = require('../../server/server.js');
  });

  xit('GET /api/users should return a list of User records', function(done) {
    // request(app)
    //   .get('/users')
    //   .set('Accept', 'application/json')
    //   .expect('Content-Type', /json/)
    //   .expect(200)
    //   .expect(function(res) {
    //     expect(res.body).to.be.ok;
    //   })
    //   .end(done);


    db.User.create({
      name: "sup"
    }).then(function(created){
      request(app)
      .get('/api/users/:'+created.id)
      .expect(200)
      .end(function(err,res){
        console.log("Reached END");
        expect(res.body).to.be.ok;
        // expect(res.body.name).to.equal("sup");
        done();
      });
    });
  });

  xit('GET /api/user/:id should return a specified User record', function(done){
    sequelize.query("INSERT INTO users VALUES (?, ?)", null, null, ['John Smith', 'M'])
      .success(function(user) {
        console.log(user);

        request(app)
          .get('/users/' + user.id)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(function(res) {
            expect(res.body.name).to.be.equal('John Smith');
          })
          .end(done);
      });
  });

  xit('POST /api/user should insert a new User record', function(done) {
    request(app)
      .post('/users')
      .send({
        name: 'John Smith',
        gender: 'M',
        token: 'testToken',
        email: 'test@test.com'
      })
      .expect(200)
      .expect(function(res) {
        sequelize.query("SELECT * FROM users WHERE name = :name", null, null, {name: name})
          .success(function(result) {
            console.log(result);
            expect(result.length).to.be.equal(1);
            expect(result.name).to.be.equal("John Smith");
            done();
          });
      })
      .end(done);
  });
});
