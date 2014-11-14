var ReportedCase = require('../database/dbSchema').ReportedCase;

module.exports = {

  getAllReportedCases: function(req, res, next) {
    ReportedCase.findAll({ limit: 100 })
      .success(function(reportedCases) {
        res.status(200).send(reportedCases);
      });
  },

  getReportedCase: function(req, res, next) {
    ReportedCase.find(req.params.id).then(function(reportedCase) {
      res.status(200).send(reportedCase);
    });
  },

  createNewCase: function(req, res, next) {
    ReportedCase.create({
      disease_id: req.body.disease_id,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      date: req.body.date,
      description: req.body.description })
      .success(function(reportedCase) {
        res.setHeader('Content-Type', 'application/json');
        res.status(201).send(reportedCase.dataValues);
      })
      .error(function(err) {
        res.status(400).send({ error: err.name, message: err.message });
      });
  },

  showAllReportedCase: function(req, res, next) {
    ReportedCase.findAll({ order: 'created_at DESC', limit: 100 }).
      success(function(reportedCases) {
        res.render('locations', { locations: reportedCases });
      });
  }
};
