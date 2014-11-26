var db = require("../database/dbSchema.js");
var diseaseController = require("./diseaseController.js")

var _showAllProximityReports = function(req, res, next){
	db.ProximityReport.findAll({include: [ db.Disease ], order: 'id DESC' })
      .success(function(results) {
      	console.log(results);
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