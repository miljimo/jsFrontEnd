"use strict"

var uuid = require('node-uuid');

var timers  = timers || {};	
var CURRENT = CURRENT || null;
var COUNTER = COUNTER || 0;

/**
 The file is a simple timer class 
 @class
 @param {DomString} name of the current timer thread [options]
 @param {Integer}  interval the interval (milliseconds) of which the timer should call it self repeatly default 0;
 @param {Integer} repeat the number of times the timer should called its self, if not specif it will continous to repeat util killed

*/
var Timer =(function(name, interval, repeats)
	{
       if(typeof name =='number'){
       	  repeats = interval;
       	  interval = name;
       	  name = null;
       }
	   this.interval = (typeof interval==="number"&& interval >=0)?interval: 1000;
	   this.repeats = (typeof repeats==="number"&& repeats > 0)?repeats: null;
	   this.count=0;
	   var name = (typeof name ==='string')?name: Timer.generateUUID();
	   Object.defineProperties(this, {"tname":{value:name,writable:false,enumerable:false}});
	   Object.defineProperties(this, {"tid":{value:(++COUNTER),writable:false,enumerable:false}});
	  
      if(timers[name]) throw new Error("Timer with the given name already exists");
      timers[this.tname]={id:this.tid, timer:this, state: Timer.PENDING}
	});


/**
  The function is used to to start the timer, only take on arguments
  @method
  @memberof Timer
  @param {Function} callback a callback  function  that will be called in every interval specific on the contructor
*/
Timer.prototype.start =(function(callback)
	{   

		if(!callback || timers[this.tname].state===Timer.KILLED) return;
         
	    timers[this.tname].state= Timer.WAITING;
	    timers[this.tname].callback= callback;
		this.interval = (typeof this.interval==="number"&& this.interval >=0)?this.interval: 1000;
	    this.repeats = (typeof this.repeats==="number" && this.repeats > 0)?this.repeats: null;
	    this.id = window.setInterval((function()
	    {
	    	timers[this.tname].state= Timer.ACTIVE;
	    	CURRENT=this;
	    	if(this.repeats!=null)
	    	{
	    		this.count++;
	    		if(this.count >= this.repeats)
	    			this.kill();
	    	}

	       if(typeof callback ==='function'){
	       	  callback.apply(null,[timers[this.tname].id]);
	       	  timers[this.tname].state= Timer.WAITING;
	       }

	    }).bind(this), this.interval);
	});
/**
  The function return the current state of the timer
  @method
  @memberof Timer# 
*/
Timer.prototype.state =(function(){
	 return timers[this.tname].state;
	});

/**
  The function return the current state of the timer
  @method
  @memberof Timer# 
*/
Timer.prototype.reset =(function(){
    timers[this.tname].state = Timer.PENDING;
  });
/**
  The function return the string name of the class Timer
  @method
  @memberof Timer# 
  @return {DomString}
*/
Timer.toString=(function(){
		return "[class Timer]";
})
/**
  The function return the string name of the object Timer
  @method
  @memberof Timer# 
  @return {DomString}
*/
Timer.prototype.toString=(function(){
		return "[object Timer]";
})
/**
  The function killed the timer thread and stop it 
  @method
  @memberof Timer# 
  @return {DomString}
*/	
Timer.prototype.kill =(function()
	{
	   window.clearInterval(this.id);	
     var t_ =    timers[this.tname];
     if(t_ instanceof Timer){
        t_.state= Timer.KILLED;
     }
	});


Timer.create =(function(name, interval, repeat){
	var _sTimer  = null;
	if(timers[name]){
	  _sTimer = timers[name];
	}else
	  {
	    _sTimer = new Timer(name, interval, repeat);
	  }
 	return _sTimer;
})
/**
 Generated a uuuid for the timer
  @method
  @memberof Timer
  @return {DomString}
*/	

Timer.generateUUID =(function(len){
	return uuid.v4();
})
/**
 Get the timer current name if there is any else null
  @method
  @memberof Timer
  @return {Timer} 
*/	
Timer.get=(function(name){
	return (timers[name])?timers[name]:null;
});
/**
  Get the total number of timer  current running
  @method
  @memberof Timer
  @return {Integer} 
*/
Timer.count=(function(){
	   return COUNTER;
});
/**
  get the current running timer
  @method
  @memberof Timer
  @return {Timer} 
*/
Timer.current=(function(){
	  return CURRENT;
});
/**
  The function move the timer to the give state
  @method
  @memberof Timer
  @return {void} 
  @param {domString}  name the name of the timer to execute
  @param {Integer}  the current state to move the timer to
*/
Timer.execute  =(function(name, state){
     if(typeof name !='string')
     	var state = name;
    var timer =null;
     if(timers[name]){
     	 timer ==timers[name];
     }
     if(typeof state ==='number'){
       if(timer){
       	   __exec(state, timer);
       	   return;
       }
      for(p in timers){
      	var struct =timers[p];
      	timer = struct.timer;
        __exec(state, timer);
      }
     }
  
})
	//private function
	var __exec =(function(state, timer){
		switch(state){
           case Timer.PENDING:
            timer.kill();
            timers[timer.tname].state=Timer.KILLED;
            break;
           case Timer.KILLED:
            timer.kill();
           break;
		}
	})

/**
  @property {Integer}  PENDING
  @memberof Timer
*/
Timer.PENDING = 0;
/**
  @property {Integer}  PENDING
  @memberof Timer
*/
Timer.WAITING = 1;
   /**
  @property {Integer}  PENDING
  @memberof Timer
*/
Timer.ACTIVE  = 2;
   /**
  @property {Integer}  PENDING
  @memberof Timer
*/
Timer.KILLED  = 3;


module.exports = Timer;



