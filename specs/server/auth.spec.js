var db = require('../../server/database/dbSchema.js');
var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server/server.js');

describe('Auth specs', function() {

  it('should return a 401 if not logged in',function(done){
    request(app)
      .get('/auth/me')
      .expect(401, done);
  });

  it('should not crash if logging in with empty params',function(done){
    request(app)
      .post('/api/users/login')
      .expect(400,done);
  });

  it('should return the user object if its logged in', function(done){
    request(app)
      .post('/api/users/login')
      .expect(200,done);
  });

});
