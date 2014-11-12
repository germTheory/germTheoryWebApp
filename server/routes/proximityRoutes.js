var proximityController = require('../controllers/proximityController');
var helpers = require('../lib/helpers');

module.exports = function (app) {
  
  app.param('user_id', proximityController.getUserCode); // set param value for user_id
  app.param('disease_id', proximityController.getDiseaseId);
  // '/api/proximity/'
  app.route('/')
    .get(proximityController.getAllIndexes) // get all user indexes from table
    .post(proximityController.newUserIndex) // create a new entry in the table, userid must be included in the request
    .put(proximityController.updateUserIndex) // update existing entry with a new index, userid must be included in the request 
    .delete(helpers.invalidMethodHandler); // return 405 error

  // '/api/proximity/:user_id'
  app.route('/users/:user_id')
    .get(proximityController.getUserIndex) // return all locations for a given user_id
    .post(proximityController.newUserIndex) // create a new entry in the table
    .put(proximityController.updateUserIndex) // update existing entry with a new index
    .delete(proximityController.deleteUserIndex); // Delete user row in table (if user elects to delete their account)

  app.route('/disease/:disease_id')
    .get(proximityController.getDiseaseIndexes); // Get all indexes for a specific disease
};
