var db = require('./../database/dbSchema.js');

var _createReport = function(req, res, next){
	// TODO: set up a child process to trigger the locations.py script
	var data = {};
	if(req.body.userName !== ''){
		data.userName = req.body.userName;
	}
	data.threshold = parseInt(req.body.threshold);
	data.reportName = req.body.reportName;
	data.diseaseName = req.body.diseaseName;
	data.contagiousness = parseInt(req.body.contagiousness);
	console.log(data);
	res.render('reports');
};

module.exports = {
	createReport: _createReport
}