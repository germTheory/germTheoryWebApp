var express = require('express');
var db = require('./server/database/dbSchema.js');

var app = express();

var seed = require('./server/config/seed.js')

var users=[];
var userIds = [];
for(var i = 1; i < 101; i++){
	users.push({ name: 'User '+i, gender: 'M', token: 'sometoken', email: 'user'+i+'@user.com' });
	userIds.push(i);
}

db.sequelize.sync({force: true}).then(function(){
    db.User.bulkCreate(users).then(function(newUsers){
      var result = seed.simulate(userIds, 1415318400000, 1415577600000, 1200000);
      db.Location.bulkCreate(result).then(function(){
      	db.Disease.create( {name: 'Ebola', contagiousness: 6, incubation_period: 3, description: "Ebola virus disease (EVD; also Ebola hemorrhagic fever, or EHF), or simply Ebola, is a disease of humans and other primates caused by ebolaviruses."}).then(function(disease){
      		db.User.find(1).then(function(user){
      			UserDisease.create({ user_id: 1, disease_id: 1, est_date_of_infection: new Date(2014, 9, 26), day_of_first_symptoms: new Date(2014, 10, 05)}).then(function(){
      				db.User.find(14).then(function(user2){
      					UserDisease.create({ user_id: 14, disease_id: 1, est_date_of_infection: new Date(2014, 10, 05), day_of_first_symptoms: new Date(2014, 10, 16)}).then(function(){
                    console.log("SUCCESS");
      					});
      				});
      			});
      		});
      	});
      });
    });
});