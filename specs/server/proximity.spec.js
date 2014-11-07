var db = require('../../server/database/dbSchema.js');
var request = require('supertest');
var mocha = require('mocha');

describe('Proximity',function(){
  var fakeProximity = [];
  var lastid;
  before(function(done){
      db.sequelize.sync({force: true}).then(function(){
        db.User.bulkCreate([{ id: 1, name: 'Jose Merino', gender:'M'}, { id: 2, name: 'John Smith', gender: 'M'}]).then(function(user){
          lastid = 2;
          var fakeProx1 = {
                user_id: 1,
                value: .64,
                id: 1
              },
              fakeProx2 = {
                user_id: 2,
                value: .29,
                id: 2
              };
          fakeProximity.push(fakeProx1);
          fakeProximity.push(fakeProx2);
          done();
        });
      });
  });

  describe('Sequelize Proximity Model',function(){
    it('should be able to create rows in database',function(done){
      db.Proximity.create(fakeProximity[0])
      .then(function(model){
        done();
      },
      function(error){
        done(error);
      });
    });
    it('should fail if properties are incorrectly specified',function(done){
      db.Proximity.create({ user_id: lastid, value: "A value that will not work" })
      .then(function(model){
        done('Error, expected db operation to fail, but it worked.');
      },
      function(error){
        done();
      });
    });
  });

  describe('Proximity API Integration', function(){
    var app;

    before(function(){
      // setup a test server
      app = require('../../server/server.js');
    });

    beforeEach(function(done){
      db.Proximity.destroy().then(function(items, error){
          if(error) {
            done("Error: Unable to remove items from Proximity table");
          }
          db.Proximity.bulkCreate(fakeProximity).then(function(items, err){
            if(err){ 
              done('Error: Unable to create items in Proximity table');
            }
            done();
          }); 
        });
    });

    describe('Routes: /api/proximity/', function(){
      
      it('should have proximity endpoint',function(done){
        request(app)
          .get('/api/proximity')
          .expect(200);
        done();
      });

      it('should return all user indexes for a GET request to /api/proximity/', function(done){
        request(app)
          .get('/api/proximity')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res){
            if (err) return done(err);
            console.log(res.body);
            expect(res).to.be.ok();
            expect(res.body.length).to.eql(2);
            done();
          });
      });
    });

    describe('Routes: /api/proximity/:userId',function(){
      // beforeEach(function(){
      // });
      xit('should have proximity endpoint',function(){
        request(app)
          .get('proximity')
          .expect(200);
      });

    });

  });
});