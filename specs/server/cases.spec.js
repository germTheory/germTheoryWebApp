var db = require('../../server/database/dbSchema.js');
var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server/server.js');

describe('Reported Cases Test Suite', function() {

  var disease_id;

  before(function(done) {
    db.sequelize.sync({ force: true }).success(function() {
      db.Disease.create({ name: "Ebola" })
        .success(function(disease) {
          disease_id = disease.id;
          done();
        });
    });
  });

  describe('GET: /api/cases', function() {
    it('should return a list of cases', function(done) {
      db.ReportedCase.bulkCreate([
        {
          disease_id: disease_id,
          latitude: 12.678,
          longitude: 23.456,
          date: Date.now(),
          description: "Ebola is bad"
        },
        {
          disease_id: disease_id,
          latitude: 12.345,
          longitude: 23.456,
          date: Date.now(),
          description: "Ebola is really bad"
        }
      ])
        .success(function(cases) {
          request(app)
            .get('/api/cases')
            .expect(200)
            .end(function(err, res) {
              expect(res.body.length).to.be.equal(2);
              expect(res.body[0].latitude).to.equal(12.678);
              done();
            });
        });
      });
  });

  describe('GET: /api/cases/:id', function() {
    it('should return a single case', function(done) {
      db.ReportedCase.create({
        disease_id: disease_id,
        latitude: 12.345,
        longitude: 23.456,
        date: Date.now(),
        description: "Ebola is bad"
      }).then(function(created) {
        request(app)
          .get('/api/cases/' + created.id)
          .expect(200)
          .end(function(err, res) {
            expect(res.body.latitude).to.equal(12.345);
            done();
          });
      });
    });

    it('should respond an empty result if not exist', function(done) {
      request(app)
        .get('/api/cases/' + 3000)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.deep.equal({});
          done();
        });
    });
  });

  describe('POST: /api/cases', function() {
    it('should return an error message upon invalid request', function(done) {
      request(app)
        .post('/api/cases')
        .send( {disease_id: disease_id })
        .expect(400)
        .end(function(req, res) {
          expect(res.body.message).to.be.equal('Validation error');
          done();
        });
    });

    it('should insert a new case', function(done) {
      request(app)
        .post('/api/cases')
        .send({
          disease_id: disease_id,
          latitude: 14.252,
          longitude: 20.523,
          date: Date.now(),
          description: "Ebola is really bad"
        })
        .expect(201)
        .end(function(err, res) {
          if (err) {
            done(err);
          }

          db.ReportedCase.find(res.body.id)
            .success(function(found) {
               expect(found.dataValues.latitude).to.be.equal(14.252);
              expect(found.dataValues.longitude).to.be.equal(20.523);
              done();
            });
        });
    });
  });

  describe('PUT/DELETE: /api/cases', function() {
    it('should return "Method not allowed" error', function(done) {
      request(app)
        .delete('/api/cases/1')
        .expect(404)
        .end(function(req, res) {
          expect(res.body.message).to.be.equal('Method not allowed');
          done();
        });
    });
  });
});
