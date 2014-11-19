var db = require('./../database/dbSchema.js');


var _getDiseasesPage = function(req, res){
	db.Disease.findAll({ include: db.User }).then(function(diseases){
			res.render('diseases', { diseases: diseases });
	});
}

var _getAllDiseases = function(cb){
	db.Disease.findAll().then(function(diseases){
		cb(diseases);
	});
}

module.exports = {
	getDiseasesPage: _getDiseasesPage,
	getAllDiseases: _getAllDiseases
}