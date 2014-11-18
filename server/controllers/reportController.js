var db = require("../database/dbSchema.js");

var _showAllProximityReports = function(req, res, next){
	db.ProximityReport.findAll({ order: 'id DESC' })
      .success(function(results) {
        res.set('Content-Type', 'text/html');
        res.render('reports', { results: results }); 
      });
}

module.exports = {
	showAllProximityReports: _showAllProximityReports
}