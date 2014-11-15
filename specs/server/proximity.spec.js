var db = require('../../server/database/dbSchema.js');
var request = require('supertest');
var mocha = require('mocha');
var expect = require('expect.js');
var app = require('../../server/server.js');

describe('Proximity Test Suite', function() {
  var fakeProximity = [];
  var lastid;

  before(function(done) {
    db.sequelize.sync({ force: true }).then(function() {
      db.Disease.create({ name: "Ebola" })
        .then(function() {
          db.User.bulkCreate([
            { name: 'Jose Merino', gender: 'M', token: 'testToken1', email: 'test@test1.com' },
            { name: 'John Smith', gender: 'M', token: 'testToken2', email: 'test@test2.com' }])
            .then(function(user) {
              lastid = 2;
              var fakeProx1 = {
                  user_id: 1,
                  value: .64,
                  disease_id: 1
                },
                fakeProx2 = {
                  user_id: 2,
                  value: .53,
                  disease_id: 1
                };
              fakeProximity.push(fakeProx1);
              fakeProximity.push(fakeProx2);
              done();
            });
        });
    });
  });

  describe('Sequelize Proximity Model', function() {
    it('should be able to create rows in database', function(done) {
      db.Proximity.create(fakeProximity[0])
        .then(function(model) {
          done();
        },
        function(error) {
          done(error);
        });
    });

    it('should fail if properties are incorrectly specified', function(done) {
      db.Proximity.create({ user_id: lastid, value: "A value that will not work" })
        .then(function(model) {
          done('Error, expected db operation to fail, but it worked.');
        },
        function(error) {
          done();
        });
    });
  });

  describe('Proximity API Tests', function() {

    describe('Routes: /api/proximity/', function() {
      beforeEach(function(done) {
        db.Disease.destroy()
          .then(function(item) {
            db.Proximity.destroy()
              .then(function(items) {
                db.Disease.create({ id: 1, name: "Ebola" })
                  .then(function(disease) {
                    db.Proximity.bulkCreate(fakeProximity)
                      .then(function(complete) {
                        done();
                      }, function(err4) {
                        done(err4);
                      }); // end of bulkCreate
                  }, function(err3) {
                    console.log("Error: Unable to create item in Disease Table");
                    done(err3);
                  }); // end of disease create
              }, function(err2) {
                done("Error: Unable to Destroy items in Proximity Table");
              }); // end of Proximity Destroy
          }, function(err1) {
            done("Error: Unable to destroy items in disease table");
          }); // end of Disease Destroy
      });

      it('should accept GET requests to /api/proximity', function(done) {
        request(app)
          .get('/api/proximity')
          .expect(200)
          .end(function(err, res) {
            done();
          });
      });

      it('should return all user indexes for a GET request to /api/proximity/', function(done) {
        request(app)
          .get('/api/proximity')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              done(err);
              return;
            }
            expect(res).to.be.ok();
            expect(res.body.length).to.eql(2);
            done();
          });
      });

      it('should return a 400 error for bad POST requests to /api/proximity', function(done) {
        request(app)
          .post("/api/proximity")
          .send({ user_id: "hello", value: "something", disease_id: 1 })
          .expect(400)
          .end(function(err, res) {
            if (err) {
              done(err);
              return;
            }
            done();
          });
      });

      it('should add a user index to the proximity table for a POST request to /api/proximity', function(done) {
        db.User.create({
          name: 'Jameson Gamble',
          gender: 'M',
          token: 'jamesonToken',
          email: 'jameson@jameson4.com'
        })
          .then(function(user) {
            request(app)
              .post('/api/proximity')
              .send({ user_id: user.dataValues.id, value: .8, disease_id: 1 })
              .expect(201)
              .end(function(err, res) {
                if (err) {
                  done(err);
                }
                done();
              });
          }, function(error) {
            done(error);
          });
      });

      it('should update a user entry when receiving a PUT request to /api/proximity', function(done) {
        request(app)
          .put("/api/proximity")
          .send({ user_id: 1, value: .24 })
          .expect(200)
          .end(function(err, res) {
            if (err) {
              done(err);
            }
            db.Proximity.find({ where: { user_id: 1 } })
              .then(function(item) {
                expect(item.value).to.eql(.24);
                done();
              });
          });
      });

      it('should return a 405 error for DELETE requests to /api/proximity', function(done) {
        request(app)
          .delete("/api/proximity")
          .expect(405)
          .end(function(err, res) {
            done();
          })
      });
    });

    describe('Routes: /api/proximity/:userId', function() {
      beforeEach(function(done) {
        db.Disease.destroy()
          .then(function(item) {
            db.Proximity.destroy()
              .then(function(items) {
                db.Disease.create({ id: 1, name: "Ebola" })
                  .then(function(disease) {
                    db.Proximity.bulkCreate(fakeProximity)
                      .then(function(complete) {
                        done();
                      }, function(err4) {
                        done(err4);
                      }); // end of bulkCreate
                  }, function(err3) {
                    console.log("Error: Unable to create item in Disease Table");
                    done(err3);
                  }); // end of disease create
              }, function(err2) {
                done("Error: Unable to Destroy items in Proximity Table");
              }); // end of Proximity Destroy
          }, function(err1) {
            done("Error: Unable to destroy items in disease table");
          }); // end of Disease Destroy
      });

      it('should accept GET requests to /api/proximity/users/:userId', function(done) {
        request(app)
          .get('/api/proimity/users/:userId')
          .expect(200)
          .end(function() {
            done();
          });
      });

      it('should return a 404 error when asked for the information of a User that does not Exist', function(done) {
        request(app)
          .get('/api/proimity/users/50')
          .expect(404)
          .end(function() {
            done();
          });
      });

      it('should return a single user\'s indexes for a GET request to /api/proximity/users/:user_id', function(done) {
        request(app)
          .get('/api/proximity/users/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              done(err);
            }
            expect(res).to.be.ok();
            expect(res.body).to.be.ok();
            done();
          });
      });

      it('should add a user index to the proximity table for a POST request to /api/proximity/users/:user_id', function(done) {
        db.User.destroy({ where: { id: 3 } }).then(function(destroyedCount) {
          db.User.create({
            id: 3,
            name: 'Jameson Gamble',
            gender: 'M',
            token: 'jamesonToken',
            email: 'jameson@jameson.com'
          })
            .then(function(user) {
              request(app)
                .post("/api/proximity/users/3")
                .send({ value: .8, disease_id: 1 })
                .expect(201)
                .end(function(err, res) {
                  if (err) {
                    console.log("ERROR POSTING");
                    done(err);
                  }
                  db.Proximity.find({ where: { user_id: 3 } })
                    .then(function(item) {
                      expect(item.value).to.eql(.8);
                      expect(item.user_id).to.eql(3);
                      done();
                    }, function(err) {
                      console.log("ERROR FINDING USER");
                      done(err);
                    })
                });
            }, function(error) {
              console.log("Cannot Create User");
            });
        });
      });

    });

    it('should update a user entry when receiving a PUT request to /api/proximity/users/:userId', function(done) {
      request(app)
        .put("/api/proximity/users/1")
        .send({ value: .24 })
        .expect(200)
        .end(function(err, res) {
          if (err) {
            done(err);
          }
          db.Proximity.find({ where: { user_id: 1 } })
            .then(function(item) {
              expect(item.value).to.eql(.24);
              done();
            });
        });
    });

    it('should delete a user entry when receiving a DELETE request to /api/proximity/users/:userId', function(done) {
      request(app)
        .delete("/api/proximity/users/2")
        .end(function(err, res) {
          if (err) {
            done(err);
          }
          db.Proximity.find({ where: { user_id: 1 } })
            .then(function(item) {
              expect(item).to.be.null;
              done();
            });
        });
    });
    describe('Routes: /api/proximity/disease/', function() {
      beforeEach(function(done) {
        db.Disease.destroy()
          .then(function(item) {
            db.Proximity.destroy()
              .then(function(items) {
                db.Disease.create({ id: 1, name: "Ebola" })
                  .then(function(disease) {
                    db.Proximity.bulkCreate(fakeProximity)
                      .then(function(complete) {
                        done();
                      }, function(err4) {
                        done(err4);
                      }); // end of bulkCreate
                  }, function(err3) {
                    console.log("Error: Unable to create item in Disease Table");
                    done(err3);
                  }); // end of disease create
              }, function(err2) {
                done("Error: Unable to Destroy items in Proximity Table");
              }); // end of Proximity Destroy
          }, function(err1) {
            done("Error: Unable to destroy items in disease table");
          }); // end of Disease Destroy
      });

      it('should return all user indexes for a specific disease on a request to the api', function(done) {
        request(app)
          .get("/api/proximity/disease/1")
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.be.ok();
            expect(res.body.length).to.eql(2);
            expect(res.body[0].value).to.eql(.64);
            done();
          });
      })
    });
  });
});
