var request = require('supertest');
var expect = require('chai').expect;
var db = require('../../server/database/dbSchema.js');

xdescribe('User REST resource',function(){

  before(function(done){
    db.sequelize.sync({force: true})
      .success(function(){
        done();
      });
  });

  it('GET /api/users should return a list of User records', function(done) {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        expect(res.body).to.be.ok;
      })
      .end(done);
  });

  it('GET /api/user/:id should return a specified User record', function(done){
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

  it('POST /api/user should insert a new User record', function(done) {
    request(app)
      .post('/users')
      .send({
        name: 'John Smith',
        gender: 'M'
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
