var db = require('../../server/database/dbSchema.js');
var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server/server.js');

describe('Location Test Suite', function() {
  var lastid;
  var fakeLocations = [];

  before(function(done) {
    db.sequelize.sync({ force: true }).success(function() {
      db.User.create({ name: 'jose', gender: 'M', token: 'joseToken', email: 'jose@jose.com' }).success(function(user) {
        lastid = user.values.id;
        for (var i = 0; i < 100; i++) {
          var fakeLoc = {
            user_id: lastid,
            latitude: 12.252 + i * 0.001,
            longitude: 21.523423 - i * 0.001
          };
          fakeLocations.push(fakeLoc);
        }
        done();
      });
    });
  });

  describe('Location Model Tests', function() {
    it('should be able to create rows in database', function(done) {
      db.Location.create({ user_id: lastid, latitude: 12.252, longitude: 21.5234234 })
        .then(function(model) {
          done();
        },
        function(error) {
          done(error);
        });
    });

    it('should fail if properties wrong', function(done) {
      db.Location.create({ user_id: lastid, latitude: 'a' + 12.252, longitude: 21.5234234 })
        .then(function(model) {
          done('Error, expected db operation to fail, but it worked.');
        },
        function(error) {
          done();
        });
    });
  });

  describe('Location REST Tests', function() {

    describe('GET: /api/locations', function() {
      before(function(done) {
        db.Location.bulkCreate(fakeLocations).then(function(created) {
          done();
        });
      });
      it('should have locations endpoint', function(done) {
        request(app)
          .get('/api/locations')
          .expect(200, done);
      });
      it('should return locations array ', function(done) {
        request(app)
          .get('/api/locations')
          .expect(200)
          .expect(function(res) {
            expect(res.body[0].user_id).to.equal(lastid);
          })
          .end(done);
      });
    });

    describe('GET: /api/locations/:id', function() {
      it('should retrieve location by id', function(done) {
        db.Location.create({
          user_id: lastid,
          latitude: 12.345,
          longitude: 23.456
        }).then(function(created) {
          request(app)
            .get('/api/locations/' + created.id)
            .expect(200)
            .end(function(err, res) {
              expect(res.body.latitude).to.equal(12.345);
              done();
            });
        });
      });

      it('should respond empty object if not exist', function(done) {
        request(app)
          .get('/api/locations/' + 3000)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.deep.equal({});
            done();
          });
      });
    });

    describe('POST: /api/locations', function() {
      it('should reject empty locations added', function(done) {
        request(app)
          .post('/api/locations')
          .expect(400, done);
      });

      it('should add properly created locations', function(done) {
        request(app)
          .post('/api/locations')
          .send({
            user_id: lastid,
            latitude: 14.252,
            longitude: 20.523
          })
          .expect(201)
          .end(function(err, res) {
            if (err) {
              done(err);
              return;
            }
            db.Location.find({ where: { latitude: 14.252, longitude: 20.523 } })
              .then(function(found) {
                expect(found).not.to.equal(null);
                done();
              }, function() {
                done('expected to find posted value in the database');
              });
          });
      });
    });
  });
});
