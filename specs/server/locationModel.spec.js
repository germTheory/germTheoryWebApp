var db = require('../../server/database/dbSchema.js');
var request = require('supertest');

describe('Location',function(){
  var lastid;
  var fakeLocations = [];
  before(function(done){
    db.sequelize.sync({force: true}).success(function(){
      db.User.create({name: 'jose'}).success(function(user){
        lastid = user.values.id;
        for(var i = 0; i < 100;i++){
          var fakeLoc = {
            user_id: lastid,
            latitude: 12.252 + i*0.001,
            longitude: 21.523423 - i*0.001
          };
          fakeLocations.push(fakeLoc);
        }
        done();
      });
    });

  });

  beforeEach(function(){
  });

  describe('Sequelize model',function(){
    it('should be able to create rows in database',function(done){
      db.Location.create({ user_id: lastid, latitude: 12.252, longitude: 21.5234234  })
      .then(function(model){
        done();
      },
      function(error){
        done(error);
      });
    });
    it('should fail if properties wrong',function(done){
      db.Location.create({ user_id: lastid, latitude: 'a'+12.252, longitude: 21.5234234  })
      .then(function(model){
        done('Error, expected db operation to fail, but it worked.');
      },
      function(error){
        done();
      });
    });

  });
  describe('API Integration',function(){
    var app;

    before(function(){
      // setup a test server
      app = require('../../server/server.js');
    });
    describe('GET /locations',function(){
      before(function(done){
        db.Location.bulkCreate(fakeLocations).then(function(){
          done();
        });
      });
      beforeEach(function(){
      });
      it('should have locations endpoint',function(){
        request(app)
        .get('locations')
        .expect(200);
      });

    });

  });
});
