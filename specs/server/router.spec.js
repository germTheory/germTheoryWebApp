var db = require('../../server/database/dbSchema.js');
var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server/server.js');

describe('Route specs', function() {

  it('should 404 if a route api does not exist' ,function(){
    request(app)
      .get('/api/not/existent')
      .expect(404, done);
  });
});
