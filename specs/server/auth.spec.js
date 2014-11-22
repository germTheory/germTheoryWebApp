var db = require('../../server/database/dbSchema.js');
var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server/server.js');
var User = db.User;

describe('Auth specs', function() {
  var authToken;

  before(function(done){
    User.bulkCreate([
      { name: 'John Lennon', gender: 'M', email: 'john@beatles.com' },
      { name: 'Paul McCartney', gender: 'M', email: 'paul@beatles.com' },
      { name: 'George Harrison', gender: 'M', email: 'george@beatles.com' },
      { name: 'Ringo Starr', gender: 'M', email: 'ringo@beatles.com' }
    ])
      .then(function(){
        request(app)
          .post('/api/users/login')
          .send({username:'john@beatles.com',password:123})
          .expect(200)
          .end(function(err, res){
            authToken = res.body.token;
            //expect(authToken).to.not.equal(undefined);
            done();
          });
      });
  });
  it('should return a 401 if not logged in',function(done){
    request(app)
      .get('/api/users/me')
      .expect(401, done);
  });
  it('should not crash if logging in with empty params',function(done){
    request(app)
      .post('/api/users/login')

      .expect(400,done);
  });

  it('should not accept bad tokens', function(done){
    request(app)
      .get('/api/users/me')
      .set('x-access-token',authToken+'abc')
      .expect(403)
      .end(function(err,res){
        if (err) return done(err);
        done();
      });
    console.log(authToken);
  });
  it('should return the user object if its logged in', function(done){
    request(app)
      .get('/api/users/me')
      .set('x-access-token',authToken)
      .expect(200)
      .end(function(err,res){
        if (err) return done(err);
        done();
      });
    console.log(authToken);
  });

});
