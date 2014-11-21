var sinon = require('sinon');
var expect = require('expect.js');
var request = require('supertest');
var app = require('../../server/server');
var userController = require('../../server/controllers/userController');
var locationController = require('../../server/controllers/locationController');
var caseController = require('../../server/controllers/caseController');
var proximityController = require('../../server/controllers/proximityController');
var authController = require('../../server/controllers/authController');
var helpers = require('../../server/lib/helpers');
var passport = require('passport');

describe('Route Test Suites', function() {
  describe('Router error handling', function(){
    it('should 404 if a route api does not exist' ,function(done){
      request(app)
        .get('/api/not/existent')
        .expect(404, done);
    });
  })
  describe('User Routes Tests', function() {

    it('should invoke userController.getAllUser when receiving a GET request to /api/users', function(done) {
      sinon.spy(userController, 'getAllUsers');

      request(app)
        .get('/api/users')
        .end(function(err, res) {
           expect(userController.getAllUsers.called).to.be.true;
           userController.getAllUsers.restore();
          done();
        });
    });

    it('should invoke userController.getUser when receiving a GET request to /api/users/:user_id', function(done) {
      sinon.spy(userController, 'getUser');

      request(app)
        .get('/api/users/1')
        .end(function(err, res) {
          expect(userController.getUser.called).to.be.true;
          userController.getUser.restore();
          done();
        });
    });

    it('should invoke helpers.invalidMethodHandler when receiving a POST request to /api/users', function(done) {
      sinon.spy(helpers, 'invalidMethodHandler');

      request(app)
        .post('/api/users')
        .send({ name: 'John Lennon', gender: 'M', email: 'john@beatles.com' })
        .end(function(err, res) {
          expect(helpers.invalidMethodHandler.called).to.be.true;
          helpers.invalidMethodHandler.restore();
          done();
        });
    });
  });

  describe('Location Routes Tests', function() {

    it('should invoke locationController.findAll when receiving a GET request to /api/locations', function(done) {
      sinon.spy(locationController, 'getAllLocations');

      request(app)
        .get('/api/locations')
        .end(function(err, res) {
          expect(locationController.getAllLocations.called).to.be.true;
          locationController.getAllLocations.restore();
          done();
        });
    });

    it('should invoke locationController.getUser when receiving a GET request to /api/locations/:user_id', function(done) {
      sinon.spy(locationController, 'getLocation');

      request(app)
        .get('/api/locations/1')
        .end(function(err, res) {
          expect(locationController.getLocation.called).to.be.true;
          locationController.getLocation.restore();
          done();
        });
    });

    it('should invoke helpers.invalidMethodHandler when receiving a POST request to /api/locations', function(done) {
      sinon.spy(locationController, 'createLocation');

      request(app)
        .post('/api/locations')
        .send({ user_id: 1, 
          location: {
            latitude: 12.252 * 0.001, 
            longitude: 21.523423 * 0.001 
          }
        })
        .end(function(err, res) {
          expect(locationController.createLocation.called).to.be.true;
          locationController.createLocation.restore();
          done();
        });
    });
  });

  describe('Auth Routes Tests', function() {

    it('should invoke passport.authenticate when receiving a GET request to /auth/google', function(done) {
      sinon.spy(passport, 'authenticate');

      request(app)
        .get('/auth/google')
        .end(function(err, res) {
          expect(passport.authenticate.called).to.be.true;
          passport.authenticate.restore();
          done();
        });
    });

    it('should invoke passport.authenticate when receiving a GET request to /auth/google/callback', function(done) {
      sinon.spy(passport, 'authenticate');

      request(app)
        .get('/auth/google/callback')
        .end(function(err, res) {
          expect(passport.authenticate.called).to.be.true;
          passport.authenticate.restore();
          done();
        });
    });

    it('should invoke authController.logout when receiving a POST request to /auth/logout', function(done) {
      sinon.spy(authController, 'logout');

      request(app)
        .get('/auth/logout')
        .end(function(err, res) {
          expect(authController.logout.called).to.be.true;
          authController.logout.restore();
          done();
        });
    });
  });

  describe('Proximity Routes Tests', function() {

    it('should invoke proximityController.getAllIndexes when receiving a GET request to /api/proximity', function(done) {
      sinon.spy(proximityController, 'getAllIndexes');

      request(app)
        .get('/api/proximity')
        .end(function(err, res) {
          expect(proximityController.getAllIndexes.called).to.be.true;
          proximityController.getAllIndexes.restore();
          done();
        });
    });

    it('should invoke proximityController.newUserIndex when receiving a POST request to /api/proximity', function(done) {
      sinon.spy(proximityController, 'newUserIndex');

      request(app)
        .post('/api/proximity')
        .send({ user_id: 1, disease_id: 1, value: .072 })
        .end(function(err, res) {
          expect(proximityController.newUserIndex.called).to.be.true;
          proximityController.newUserIndex.restore();
          done();
        });
    });

    it('should invoke proximityController.updateUserIndex when receiving a POST request to /api/proximity', function(done) {
      sinon.spy(proximityController, 'updateUserIndex');

      request(app)
        .put('/api/proximity')
        .send({ user_id: 1, disease_id: 1, value: .072 })
        .end(function(err, res) {
          expect(proximityController.updateUserIndex.called).to.be.true;
          proximityController.updateUserIndex.restore();
          done();
        });
    });

    it('should invoke proximityController.invalidMethodHandler when receiving a POST request to /api/users', function(done) {
      sinon.spy(helpers, 'invalidMethodHandler');

      request(app)
        .del('/api/proximity/1')
        .end(function(err, res) {
          expect(helpers.invalidMethodHandler.called).to.be.true;
          helpers.invalidMethodHandler.restore();
          done();
        });
    });

    it('should invoke proximityController.getUserIndex when receiving a GET request to /api/proximity/users/:user_id', function(done) {
      sinon.spy(proximityController, 'getUserIndex');

      request(app)
        .get('/api/proximity/users/1')
        .end(function(err, res) {
          expect(proximityController.getUserIndex.called).to.be.true;
          proximityController.getUserIndex.restore();
          done();
        });
    });

    it('should invoke proximityController.newUserIndex when receiving a POST request to /api/proximity/users/:user_id', function(done) {
      sinon.spy(proximityController, 'newUserIndex');

      request(app)
        .post('/api/proximity/users/1')
        .send({ user_id: 1, disease_id: 1, value: .072 })
        .end(function(err, res) {
          expect(proximityController.newUserIndex.called).to.be.true;
          proximityController.newUserIndex.restore();
          done();
        });
    });

    it('should invoke proximityController.updateUserIndex when receiving a POST request to /api/proximity/users/:user_id', function(done) {
      sinon.spy(proximityController, 'updateUserIndex');

      request(app)
        .put('/api/proximity/users/:user_id')
        .send({ user_id: 1, disease_id: 1, value: .072 })
        .end(function(err, res) {
          expect(proximityController.updateUserIndex.called).to.be.true;
          proximityController.updateUserIndex.restore();
          done();
        });
    });

    it('should invoke proximityController.deleteUserIndex when receiving a POST request to /api/proximity/users/:user_id', function(done) {
      sinon.spy(proximityController, 'deleteUserIndex');

      request(app)
        .del('/api/proximity/users/1')
        .end(function(err, res) {
          expect(proximityController.deleteUserIndex.called).to.be.true;
          proximityController.deleteUserIndex.restore();
          done();
        });
    });

    it('should invoke proximityController.getDiseaseIndexes when receiving a GET request to /api/proximity/diseases/:user_id', function(done) {
      sinon.spy(proximityController, 'getDiseaseIndexes');

      request(app)
        .get('/api/proximity/diseases/1')
        .end(function(err, res) {
          expect(proximityController.getDiseaseIndexes.called).to.be.true;
          proximityController.getDiseaseIndexes.restore();
          done();
        });
    });
  });

  describe('Case Routes Tests', function() {

    it('should invoke caseController.getAllReportedCases when receiving a GET request to /api/cases', function(done) {
      sinon.spy(caseController, 'getAllReportedCases');

      request(app)
        .get('/api/cases')
        .end(function(err, res) {
          expect(caseController.getAllReportedCases.called).to.be.true;
          caseController.getAllReportedCases.restore();
          done();
        });
    });

    it('should invoke caseController.getReportedCase when receiving a GET request to /api/cases/:id', function(done) {
      sinon.spy(caseController, 'getReportedCase');

      request(app)
        .get('/api/cases/1')
        .end(function(err, res) {
          expect(caseController.getReportedCase.called).to.be.true;
          caseController.getReportedCase.restore();
          done();
        });
    });

    it('should invoke caseController.createNewCase when receiving a GET request to /api/cases/', function(done) {
      sinon.spy(caseController, 'createNewCase');

      request(app)
        .post('/api/cases')
        .send({ disease_id: 1, latitude: 12.252 * 0.001, longitude: 21.523423 * 0.001, date: Date.now() })
        .end(function(err, res) {
          expect(caseController.createNewCase.called).to.be.true;
          caseController.createNewCase.restore();
          done();
        });
    });

    it('should invoke helpers.invalidMethodHandler when receiving a PUT request to /api/cases/:id', function(done) {
      sinon.spy(helpers, 'invalidMethodHandler');

      request(app)
        .put('/api/cases/1')
        .send({ description: 'foo' })
        .end(function(err, res) {
          expect(helpers.invalidMethodHandler.called).to.be.true;
          helpers.invalidMethodHandler.restore();
          done();
        });
    });

    it('should invoke helpers.invalidMethodHandler when receiving a DELETE request to /api/cases/:id', function(done) {
      sinon.spy(helpers, 'invalidMethodHandler');

      request(app)
        .del('/api/cases/1')
        .end(function(err, res) {
          expect(helpers.invalidMethodHandler.called).to.be.true;
          helpers.invalidMethodHandler.restore();
          done();
        });
    });
  });
});
