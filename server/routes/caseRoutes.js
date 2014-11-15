var caseController = require('../controllers/caseController');
var helpers = require('../lib/helpers');

module.exports = function (app) {
  app.route('/')
    .get(caseController.getAllReportedCases)
    .post(caseController.createNewCase);
  app.route('/:id')
    .get(caseController.getReportedCase)
    .put(helpers.invalidMethodHandler)
    .delete(helpers.invalidMethodHandler);
};
