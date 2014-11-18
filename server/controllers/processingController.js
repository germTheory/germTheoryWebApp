var db = require('./../database/dbSchema.js');


var _createReport = function(req, res, next){
	// TODO: set up a child process to trigger the locations.py script
	var data = {};
	if(req.body.userName !== ''){
		data.userName = req.body.userName;
	}
	console.log(req.body);
	data.threshold = parseInt(req.body.threshold);
	data.reportName = req.body.reportName;
	data.diseaseName = req.body.diseaseName;
	data.contagiousness = parseInt(req.body.contagiousness);
	startArr = req.body.startDate.split('/');
	endArr = req.body.endDate.split('/');
	data.startTime = new Date(startArr[2], startArr[0] - 1, startArr[1]);
	data.endTime = new Date(endArr[2], endArr[0] - 1, endArr[1]);
	// Find DiseaseId
	db.Disease.find({where: {name: data.diseaseName} }).then(function(disease){
		db.ProximityReport.create({ disease_id: disease.dataValues.id, threshold: data.threshold, name: data.reportName })
	});
	var spawn = require('child_process').spawn;
	
	python = spawn('python3.4', ['./server/processing/locations.py', JSON.stringify(data)]);
	python.stdout.on('data', function (data) {
	  console.log('stdout DATA IS: ' + data);
	});

	python.stderr.on('data', function (data) {
	  console.log('stderr: ' + data);
	});
	res.redirect('/reports');
};

module.exports = {
	createReport: _createReport
}