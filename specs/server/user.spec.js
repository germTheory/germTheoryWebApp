var request = require('supertest');
var expect = require('expect.js');
var userController = require('../../server/controllers/userController.js');
var db = require('../../server/database/dbSchema.js');
var User = db.User;
var app = require('../../server/server.js');

describe('User Test Suites', function(){

  describe('User Controller Tests', function() {
    it('User Controller should be an object', function() {
      expect(userController).to.be.an('object');
    });

    it('should have a method called signin', function() {
      expect(userController.login).to.be.ok;
    });

    it('should have a method called signup', function() {
      expect(userController.signup).to.be.ok;
    });
  });

  describe('User Model Tests', function() {
    before(function(done) {
      db.sequelize.sync({force: true})
        .then(function() {
          done();
        }, function(err) {
          done(err);
        })
    });

    afterEach(function() {
      User.destroy();
    });

    it('should add a user to the database', function(done) {
      db.saveUser({name: 'test', gender: 'F', token: 'testToken', email: 'jameson@jameson.com'}, function(user) {
        expect(user.name).to.be('test');
        done();
      });

    });

    xit('should find User from the database', function(done) {
      db.findUser({name: 'test', gender: 'F'}, function(user) {
        console.log('user', user);
        expect(user[0].dataValues.name).to.be('test');
        done();
      });
    });
  });

  describe('User REST Tests', function(done) {

    beforeEach(function() {
      User.bulkCreate([
        { name: 'John Lennon', gender: 'M', email: 'john@beatles.com' },
        { name: 'Paul McCartney', gender: 'M', email: 'paul@beatles.com' },
        { name: 'George Harrison', gender: 'M', email: 'george@beatles.com' },
        { name: 'Ringo Starr', gender: 'M', email: 'ringo@beatles.com' }
      ]);
    });

    afterEach(function() {
      User.destroy();
    });

    it('GET: /api/users should return a list of users', function(done) {
      request(app)
        .get('/api/users')
        .expect(200)
        .end(function(err, res) {
          expect(res.body.length).to.be.equal(4);
          expect(res.body[0].email).to.be.equal('john@beatles.com');
          done();
        });
    });

    it('GET: /api/users/:id should return a specified User record', function(done) {
      User.find({ where: {email: 'john@beatles.com'} }).success(function(user) {
        request(app)
          .get('/api/users/' + user.dataValues.id)
          .expect(200)
          .end(function(err, res) {
            expect(res.body.name).to.be.equal('John Lennon');
            done();
          });
      });
    });

    it('POST: /api/users should not be allowed', function(done) {
      request(app)
        .post('/api/users')
        .send({
          name: 'John Smith',
          gender: 'M',
          token: 'testingToken',
          email: 'test@testttt.com'
        })
        .expect(405)
        .end(function(err, res) {
          expect(res.body.message).to.be.equal("Method not allowed");
          done();
        });
    });
  });
});
