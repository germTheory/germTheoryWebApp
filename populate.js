var express = require('express');
var db = require('./server/database/dbSchema.js');
var faker = require('faker');
var app = express();
var moment = require('moment');

var seed = require('./server/config/seed.js')

var users=[];
var proximityReports = [];
var cases = [];
var userIds = [];
for(var i = 1; i < 1000; i++){
	users.push({ name: faker.name.findName(), gender: 'Male', password: "1234", token: 'sometoken', email: faker.internet.email() });
	userIds.push(i);
}

console.log("Building Reports and Cases")
for( var i = 0; i < 40; i++ ) {
  cases.push({
    description: "San Francisco Ebola Case: Twin Peaks.", 
    date: faker.date.between(new Date(2014, 9, 9), new Date()), 
    latitude: Math.random() > .5 ? 37.757021 + Math.random()/50 : 37.757021 - Math.random()/50, 
    longitude: Math.random() > .5 ? -122.447385 + Math.random()/50 : -122.447385 - Math.random()/50, 
    disease_id: 1
  });
  cases.push({
    description: "San Francisco Ebola Case: Pacific Heights.", 
    date: faker.date.between(new Date(2014, 9, 9), new Date()), 
    latitude: Math.random() > .5 ? 37.791350 + Math.random()/70 : 37.791350 - Math.random()/50, 
    longitude: Math.random() > .5 ? -122.430734 + Math.random()/50 : -122.430734 - Math.random()/50, 
    disease_id: 1
  });

  var date = faker.date.between(new Date(2014, 9, 9), new Date());
  proximityReports.push({
    date: date,
    name: "CDC Report: Ebola Outbreak",
    disease_id: 1,
    threshold: 50
  });
}

console.log("Building West Africa Cases")
for( var i = 0; i < 2000; i++ ){
  cases.push({
    description: "Sierra Leone Ebola Case.", 
    date: faker.date.between(new Date(2014, 9, 9), new Date()), 
    latitude: Math.random() > .5 ? 8.829656 + Math.random()/10 : 8.829656 - Math.random()/10, 
    longitude: Math.random() > .5 ? -11.616541 + Math.random()/10 : -11.616541 - Math.random()/10, 
    disease_id: 1
  })
  cases.push({
    description: "Guinea Ebola Case.", 
    date: faker.date.between(new Date(2014, 9, 9), new Date()), 
    latitude: Math.random() > .5 ? 11.150325 + Math.random()/10 : 11.150325 - Math.random()/10, 
    longitude: Math.random() > .5 ? -11.451746 + Math.random()/10 : -11.451746 - Math.random()/10, 
    disease_id: 1
  })
}

var times = [];
db.sequelize.sync({force: true}).then(function(){
    db.User.bulkCreate(users).then(function(newUsers){
      var result = seed.simulate(userIds, new Date().getTime() - (24 * 60 * 60 * 1000), new Date().getTime(), 1200000);
      db.Location.bulkCreate(result).then(function(){
      	console.log("Completed creating all locations.");
        db.Disease.bulkCreate( [{name: 'Ebola', contagiousness: 6, incubation_period: 3, description: "Ebola virus disease (EVD; also Ebola hemorrhagic fever, or EHF), or simply Ebola, is a disease of humans and other primates caused by ebolaviruses."}, {name: 'Seasonal Influenza', contagiousness: 8, incubation_period: 2, description: "Influenza, commonly known as the flu, is an infectious disease caused by the influenza virus. Symptoms can be mild to severe."}]).then(function(disease){
          console.log("Creating cases");
          db.ReportedCase.bulkCreate(cases);
          console.log("Creating reports");
          db.ProximityReport.bulkCreate(proximityReports);
          console.log("Labeling users 1, 14, 350, and 489 as infected");
      		UserDisease.create({ user_id: 1, disease_id: 1, est_date_of_infection: new Date(2014, 9, 26), day_of_first_symptoms: new Date(2014, 10, 05)});
      		UserDisease.create({ user_id: 14, disease_id: 1, est_date_of_infection: new Date(2014, 10, 05), day_of_first_symptoms: new Date(2014, 10, 09)});
          UserDisease.create({ user_id: 350, disease_id: 1, est_date_of_infection: new Date(2014, 10, 08), day_of_first_symptoms: new Date(2014, 10, 16)});
          UserDisease.create({ user_id: 489, disease_id: 1, est_date_of_infection: new Date(2014, 10, 14), day_of_first_symptoms: new Date(2014, 10, 18)}).then(function(){
            console.log("SUCCESS");
          });
      	});
      });
    });
});