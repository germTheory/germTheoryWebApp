// var request = require('supertest');
var expect = require('expect.js');
var should = require('should');
var sequelize = require('sequelize');
var userController = require('../../server/controllers/userController.js');
var db = require('../../server/database/dbSchema.js');
var request = require('supertest');
// var expect = require('../../node_modules/chai/chai').expect;
// var express = require('express');

// Controller tests
describe('User Controller',function(){
  it('User Controller should be an object', function() {
    expect(userController).to.be.an('object');
  })

  it('should have a method called saveUser', function() {
    expect(userController.saveUser).to.be.ok;
  })

  it('should have a method called findUser', function() {
    expect(userController.findUser).to.be.ok;
  })

   it('should have a method called signin', function() {
    expect(userController.signin).to.be.ok;
  })

  it('should have a method called signup', function() {
    expect(userController.signup).to.be.ok;
  })

});

describe('User',function() {

  it('It should add a user to the database', function(done) {
      userController.saveUser("test", function(user){
        console.log("saveUser in test: ", user);
        expect(user).to.be('test');
        done();
      })

    })

    it('It should find User from the database', function(done){
      userController.findUser("test", function(user){
        console.log("findUser in test: ", user);
        expect(user).to.be('test');
        done();
      })
    })

    // describe('GET /users', function() {

    xit('respond with json', function(done) {
      request(app)
        .get('/user')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })

  xit('Database should have a function called diseases', function() {
    User.findUser.should.be.a('function');
  })

  xit('Database should have a function called location', function() {
    User.fetchUserLocations.should.be.a('function');
  })

})
