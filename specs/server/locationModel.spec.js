var db = require('../../server/database/dbSchema.js');
var Location = db.Location;

describe('Location Model',function(){
  var lastid;
  beforeEach(function(){
    db.sequelize.sync().success(function(){
      db.User.create({name: 'jose'}).success(function(user){
        lastid = user.values.id;
      });

    });
  });
  it('should create rows in database',function(done){
    db.Location.create({ userId: lastid, latitude: 12.252, longitude: 21.5234234  })
    .then(function(model){
      done();
    },
    function(error){
      done(error);
    });
  });
  it('should fail if parameters are wrong',function(done){
    db.Location.create({ userId: lastid, latitude: 'a'+12.252, longitude: 21.5234234  })
    .then(function(model){
      done('Error, expected db operation to fail, but it worked.');
    },
    function(error){
      done();
    });
  });

});
