var Location = require('../../server/locations/locationModel');
describe('Location Model',function(){
  it('should be awesome',function(){
    Location.hasTimestamps().should.be.a('function');
  })
})