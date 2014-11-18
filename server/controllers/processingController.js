
var _createReport = function(req, res, next){
	// TODO: set up a child process to trigger the locations.py script
	console.log(req.body);
	res.render('reports');
};

module.exports = {
	createReport: _createReport
}