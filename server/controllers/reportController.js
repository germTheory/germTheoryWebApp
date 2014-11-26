var db = require("../database/dbSchema.js");
var diseaseController = require("./diseaseController.js");
var moment = require('moment');

var _showAllProximityReports = function(req, res, next){
	db.ProximityReport.findAll({include: [ db.Disease ], order: 'id DESC' })
      .success(function(results) {
      	for(var i = 0; i < results.length; i++){
      		results[i].dataValues.created_at = moment(results[i].dataValues.created_at).format('MMMM Do, YYYY');
      	}
        res.set('Content-Type', 'text/html');
        res.render('reports', { results: results }); 
      });
};

var _newRiskReport = function(req, res, next){
	diseaseController.getAllDiseases(function(diseases){
		res.render('newRiskReport', {diseases: diseases});
	});
};

module.exports = {
	showAllProximityReports: _showAllProximityReports,
	newRiskReport: _newRiskReport
}