
/**
  The file module contain the base interface object for all the system services
  @author Obaro I. Johnson
  @date 22/08/2016

*/
"use strict"
var Promise = require('promise-polyfill');
var setAsap = require('setasap');
Promise._immediateFn = setAsap;
window.Promise = Promise;
   /**
   @class
   @constructor
   */

   var Service =(function(servicename)
   {
    if(typeof this !='object') throw "Service object required a new statement to create an object";
      if(typeof servicename=='string')
      	   Object.defineProperties(this, {"__sname":{writable:false, enumerable:false, value:servicename}});
   });
   
/**
	the method return the services name for service log reasons
	@method
	@memberof Service#
	@return {String} name of the service object
*/
	Service.prototype.getName=(function(){
		 return this.__sname;
	})

/**
  the method return the services name for service log reasons
  @method
  @memberof Service#
  @return {String} name of the service object
*/
  Service.prototype.setName=(function(name){
    if(typeof name ==='string')
        this.__sname = name;
  })

/**
	The method execute the services and return a promise object with return value
	@abstract
	@method
	@memberof Service#
	@return {Promise} return a promise object or thenable object with then  method
*/
   Service.prototype.execute=(function()
   {
      return new Promise((function(resolve, reject)
      {
         resolve(new Error("@Service.prototype.execute: interface class require implementation"));

      }).bind(this));
   });
/**
	The function return the object in string format
	@method
	@memberof Service#
	@return {String} return  a string value
*/
   Service.prototype.toString=(function()
   {
   	return "[object Service]";
   })

 /**
	The function return the class in string format
	@method
	@memberof Service#
	@return {String} return  a string value
*/
   Service.toString=(function()
   {
   	return "[class Service]";
   })


//add the object to the namespace
module.exports=Service;


