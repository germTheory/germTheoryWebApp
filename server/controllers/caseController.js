var ReportedCase = require('../database/dbSchema').ReportedCase;
var Disease = require('../database/dbSchema').Disease;
var diseaseController = require('./diseaseController.js');

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
    var splitDate = req.body.date.split('/');
    var newDate = new Date(splitDate[2], splitDate[0] - 1, splitDate[1]);

    ReportedCase.create({
      disease_id: parseInt(req.body.disease_id),
      latitude: parseFloat(req.body.latitude),
      longitude: parseFloat(req.body.longitude),
      date: newDate,
      description: req.body.description })
      .success(function(reportedCase) {
        res.setHeader('Content-Type', 'application/json');
        res.status(201).send(reportedCase.dataValues);
      })
      .error(function(err) {
        res.status(400).send({ error: err.name, message: err.message });
      });
    res.redirect('/cases');
  },

  showAllReportedCase: function(req, res, next) {
    ReportedCase.findAll({ include: [ Disease ], order: 'created_at DESC' }).
      success(function(reportedCases) {
        res.render('reportedCases', { cases: reportedCases });
      });
  },

  newReportedCase: function(req, res, next){
    diseaseController.getAllDiseases(function(diseases){
      res.render('newReportedCase', { diseases: diseases } )
    });
  }
};
