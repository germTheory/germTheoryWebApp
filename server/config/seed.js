var db = require('../../server/database/dbSchema.js');

// generates an exponential distribution random variable to model time step randomness
var exp = function(lambda){
  var res = Math.log(1-Math.random())/(1/-lambda);
  return res;
};
/**
 * Creates n points and simulates their movements between two times and stores the values in the database.
 *
 * users: an array of user ids. (only numbers)
 * start: start unix timestamp
 * end: end unix timestamp
 * lambda: exponential distribution lambda
 *
 * returns an array with the values that we tried to insert.
 *
 * note: The returned array is the result of the simulation that we attempt to insert into the database,
 * not the inserted values themselves.
 */
var generateLocations = function(users,start,end,lambda){
  var t = start;
  var n = Array.isArray(users)?users.length:users;
  var results = [];
  var saveIntoArray = function(item){
    results.push(item);
  };

  console.log('Started Simulation start: ',start,' end: ',end,lambda, '. \n Lasts for ', end-start,'ms');
  var events = [];

  // assumes that events array is sorted
  var insertEventSorted = function(event){
    // put it in the end of the list
    events.push(event);
    if(events.length === 0 ){
      return;
    }
    // sort it into place with insertion sort.
    for(var i = events.length-1; i >=1; i-- ){
      if( events[i].time > events[i-1].time ){
        var aux = events[i];
        events[i] = events[i-1];
        events[i-1] = aux;
      }else{
        break;
      }
    }
  };

  // Different functions for pdating position
  var updaters = {
    leftCircle: function(){
      var interpolation = this.interpolator;
      var p = Math.abs(this.worklng-this.homelng)+Math.abs(this.worklat-this.homelat);
      var lat = this.homelat + (this.worklat - this.homelat)/2 + 0.5*p*Math.cos(interpolation);
      var lng = this.homelng + (this.worklng - this.homelng)/2 + 0.5*p*Math.sin(interpolation);
      return [lat,lng];
    },
    rightCircle: function(){
      var interpolation = this.interpolator;
      var p = Math.abs(this.worklng-this.homelng)+Math.abs(this.worklat-this.homelat);
      var lat = this.homelat + (this.worklat - this.homelat)/2 + 0.5*p*Math.cos(interpolation);
      var lng = this.homelng + (this.worklng - this.homelng)/2 + 0.5*p*Math.sin(-interpolation);
      return [lat,lng];
    },
    diagonal: function() {
      var interpolation = this.interpolator;
      var p = Math.abs(this.worklng-this.homelng)+Math.abs(this.worklat-this.homelat);
      var lat = this.homelat + (this.worklat - this.homelat)/2 + 0.5*p*Math.cos(interpolation);
      var lng = this.homelng + (this.worklng - this.homelng)/2 + 0.5*p*Math.cos(interpolation);
      return [lat,lng];
    },
    lowDiagonal: function(){
      var interpolation = this.interpolator;
      var p = Math.abs(this.worklng-this.homelng)+Math.abs(this.worklat-this.homelat);
      var lat = this.homelat + (this.worklat - this.homelat)/2 + 0.5*p*Math.sin(interpolation);
      var lng = this.homelng + (this.worklng - this.homelng)/2 + 0.5*p*Math.sin(-interpolation);
      return [lat,lng];
    }
  };
  // generate initial set of events, 1 per person
  for(var i = 0; i < n; i++){
    var event = {
      id: Array.isArray(users)? users[i]:i+1,
      homelat: 37.789599 + (37.757034 - 37.789599) * Math.random(),
      homelng: -122.452755 + (-122.390785 + 122.452755) * Math.random(),
      worklat: 37.787022 + (37.757034 - 37.787022) * Math.random(),
      worklng: -122.432156 + (-122.390785 + 122.432156) * Math.random(),
      interpolator: 2*Math.PI*Math.random(), // offset everyone's cycle
      update:updaters[(['leftCircle','rightCircle','diagonal','lowDiagonal'])[Math.floor(Math.random()*4)]],
      time: start + exp(lambda)
    };

    // now events is sorted, with next event to be popped being the lowest time
    insertEventSorted(event);

  }

  // until simulation time is over, create data out of each event and generate the next one.
  while (t < end && events.length ){

    // pop the next event.
    var currentEvent = events.pop();

    // time since last measurement
    var step = currentEvent.time-t; //ms


    // update the time
    t = currentEvent.time;

    // controls how much to move
    var interpolation = currentEvent.interpolator;



    // gets new positions based on the event update calculation
    var vals = currentEvent.update();

    saveIntoArray({
      user_id:currentEvent.id,
      latitude:vals[0],
      longitude:vals[1],
      date:t
    });

    // modify event interpolator and reinsert it into the future event list
    currentEvent.interpolator = (interpolation + 2*Math.PI/(100));

    //generate next event for this person
    currentEvent.time = t + exp(lambda);

    //make sure to insert events sorted
    insertEventSorted(currentEvent);

  }


  // return the results in case they are needed
  return results;
};
exports.simulate = generateLocations;