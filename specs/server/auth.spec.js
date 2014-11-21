var db = require('../../server/database/dbSchema.js');
var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server/server.js');

describe('Auth specs', function() {

  it('should return a 401 if not logged in',function(done){
    request(app)
      .get('/api/me')
      .expect(401, done);
  })

});
