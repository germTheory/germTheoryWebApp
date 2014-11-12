var exp = function(lambda){
  var res = Math.log(1-Math.random())/(1/-lambda);
  console.log(res);
  return res;
};

var simulate = function(start,end,lambda){
  var t = start;

  var people = [];

  console.log('Started Simulation start: ',start,' end: ',end,lambda, '. \n Lasts for ', end-start,'ms');
  var events = [];

  // assumes that events array is sorted
  var insertEventSorted = function(event){
    // put it in the end of the list
    events.push(event);
    // sort it into place with insertion sort.
    for( i = events.length-1; i >=1; i-- ){
      if( events[i] > events[i-1] ){
        var aux = events[i];
        events[i] = events[i-1];
        events[i-1] = aux;
      }else{
        break;
      }
    }
  };

  // generate initial set of events, 1 per person
  for(var i = 0; i < 10; i++){
    people.push();
    var event = {
      id: i,
      homelat: 37.789599 + (37.757034 - 37.789599) * Math.random(),
      homelng: -122.452755 + (-122.390785 + 122.452755) * Math.random(),
      worklat: 37.787022 + (37.757034 - 37.787022) * Math.random(),
      worklng: -122.432156 + (-122.390785 + 122.432156) * Math.random(),
      interpolator: 2*Math.PI*Math.random(), // offset everyone's cycle
      time: start + exp(lambda)
    };
    people.push(person);

    // now events is sorted, with next event to be popped being the lowest time
    insertEventSorted(event);

  }

  while (t < end && events.length ){

    // pop the next event.
    var currentEvent = events.pop();

    // time since last measurement
    var step = t; //ms

    // update the time
    t = currentEvent.time;

    //insert someone at the position of the event

    var p = Math.abs(currentEvent.worklng-currentEvent.homelng)+Math.abs(currentEvent.worklat-currentEvent.homelat);
    var lat = currentEvent.homelat + (currentEvent.worklat - currentEvent.homelat)/2 + p*Math.cos(currentEvent.interpolator);
    var lng = currentEvent.homelng + (currentEvent.worklng - currentEvent.homelng)/2 + p*Math.sin(currentEvent.interpolator);


    // update event and insert it on list.
    currentEvent.interpolator+= 2*Math.PI*step/3600000;

    //generate next event for this person
    currentEvent.time = t + exp(lambda);
    insertEventSorted(currentEvent);

    console.log('Executed ',t,lat,lng, 'Time left : ', end-t);
  }
};
simulate(Date.now()-24*3600*1000, Date.now(),120000);