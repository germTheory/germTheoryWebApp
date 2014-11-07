var db = require('../../server/database/dbSchema.js');
var Location = db.Location;

describe('Location Model',function(){
  var lastid;
  beforeEach(function(done){
    db.sequelize.sync({force: true}).success(function(){
      db.User.create({name: 'jose'}).success(function(user){
        lastid = user.values.id;
        done();
      });

    });
  });
  it('should be able to create rows in database',function(done){
    console.log('creating stuff');
    db.Location.create({ user_id: lastid, latitude: 12.252, longitude: 21.5234234  })
    .then(function(model){
      done();
    },
    function(error){
      done(error);
    });
  });
  it('should fail if parameters are wrong',function(done){
    db.Location.create({ user_id: lastid, latitude: 'a'+12.252, longitude: 21.5234234  })
    .then(function(model){
      done('Error, expected db operation to fail, but it worked.');
    },
    function(error){
      done();
    });
  });

});
