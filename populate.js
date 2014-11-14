var express = require('express');
var db = require('./server/database/dbSchema.js');

var app = express();

var seed = require('./server/config/seed.js')

var users=[];
var userIds = [];
for(var i = 1; i < 101; i++){
	users.push({ id: i, name: 'User '+i, gender: 'M', token: 'sometoken', email: 'user'+i+'@user.com' });
	userIds.push(i);
}

db.sequelize.sync({force: true}).then(function(){
    db.User.bulkCreate(users).then(function(newUsers){
      var result = seed.simulate(userIds, 1415318400000, 1415577600000, 1200000);
      db.Location.bulkCreate(result).then(function(){
      	db.Disease.create( {name: 'Ebola'}).then(function(disease){
      		db.User.find(1).then(function(user){
      			user.addDisease(disease).then(function(){
      				db.User.find(14).then(function(user2){
      					user2.addDisease(disease).then(function(){
      						console.log("SUCCESS");
      					});
      				});
      			});
      		});
      	});
      });
    });
});