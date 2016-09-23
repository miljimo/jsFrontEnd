/**
Async task element
@author Obaro I. Johnson
@date 17/08/2016 15:17
@license 
*/

"use strict"
var Service = require('./service.js');
var UrlRequestor  = require("../cores/urlrequestor.js");




/**
 The class run any server request on the background 
@class ServerService
*/
 var ServerService =Object.extends(Service, (function(servicesname)
 {
    ServerService.superclass.constructor.call(this, servicesname || "ServiceTask");
   	if(!this)throw new Error("@ServerService required a new statment to create an object");   
   

 }));
/**
 The function run this codes in the doInbackground function in a different.
 @method
 @memeberof ServerService
 @return {Mixtype} Result to pass to the onPostExecute function
*/
ServerService.prototype.doInbackground =(function(request, url){
   //send your request data to the give server
   console.log("@ServerService.prototype.doInbackground : Require implementation");
});



/**
 Execute the Request with the give parameter
 @method
*/
ServerService.prototype.execute =(function(url){
  if(this.__urRequestor)this.__urRequestor=null;
   Object.defineProperties(this, {"__urRequestor":{value: new UrlRequestor(url, true),writable:true, enumerable:false}});
  this.__urRequestor.open(url);
  return new Promise((function(resolve, reject){
     this.__urRequestor.onComplete = resolve;
     this.__urRequestor.onError     = reject;
     this.doInbackground(this.__urRequestor, url);
  }).bind(this));

 });



/**
To string methods
*/
 ServerService.toString=(function(){
 	return "[class ServerService]";
 });
 ServerService.prototype.toString=(function(){
 	return "[object ServerService]";
 })









/*************PRIVATE METHODS*******************
The private or helper function for the above class module 
*/
 var init =(function(resolve, reject){
  this.requestStatus = 0;
  var req= null;
   if(XMLHttpRequest)
       req = new XMLHttpRequest();
   else
     req = new  new ActiveXObject("Microsoft.XMLHTTP");

   if(!req) throw new Error("Broswer does not support XMLHttpRequest Object");
     Object.defineProperties(this, {"__request":{value:req, writable:false, enumerable:false}});
   if(req.addEventListener){
    req.addEventListener("load", (function(event){
      resolve(req.responseText);
    }));
    req.addEventListener("error", (function(){
      this.error= {status:req.status,state:req.readyState, error:getRequestStatusMessage(req.status,req.readyState)};
      reject(new Error(getRequestStatusMessage(req.status,req.readyState)));
      this.requestStatus = req.status;
    }).bind(this));
    req.addEventListener("abort", (function(){
       this.error= {status:req.status,state:req.readyState, error:"aborted"};
      reject(new Error( getRequestStatusMessage(req.status,req.readyState)));
      this.requestStatus =req.status;
    }).bind(this));
   }else{
        req.onreadystatechange = (function() {
        this.requestStatus = req.status;
        if (req.readyState == 4 && req.status == 200) {
            resolve(req.responseText);
        }else if(req.status >200){
         this.error= {status:req.status,state:req.readyState, error:"server not found"};
          reject(new Error(getRequestStatusMessage(req.status,req.readyState)));
        }else if(req.readyState===0){
          this.error= {status:req.status,state:req.readyState, error:"connection error"};
          reject(new Error(getRequestStatusMessage(req.status,req.readyState)));
        }
    }).bind(this);
   }
});


var sendRequest=(function(){

   var fields = "";
  if(this.__fields){
  	  fields = (function(){
  	  	var fields ="";
  	  	var isFirst =true;
        for(var prop in this.__fields){
        	var data = "";
        	if(isFirst){
        		data = ""+prop+"="+this.__fields[prop];
        		isFirst=false;
        	}else
        	  data = "&"+prop+"="+this.__fields[prop];
        	fields = fields + data;
        }
        return fields;
  	 }).bind(this)();
  }
  
  this.__request.open(this.__method, this.__url+"?"+fields);
  if(this.__headers){
  	this.__request.setRequestHeader("Context-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  	for(var prop in this.__headers){
      this.__request.setRequestHeader(prop, this.__headers[prop]);
  	}
  }
 this.__request.send();
});

//private function
var header =(function(name, value){
   if(typeof name !=='string'){
    return ;   	
   }
   if(value){
   	 this.__headers[name]= value;
   }else 
      return this.__headers[name];
});

var getRequestStatusMessage =(function(status, state){
    var status  =status?status:0;
    var state   = state?state:0;
    var result = "";
    switch(status){
      case 0:
          result="cannot established internet connection.";
          if(state ==4){
             result="unable to connect to server , check internet connection."
          }
         break;
      case 200:
        result="ok";
        break;
      case 400:
         result="Bad request gateway, please check your internet connection again.";
         break;
       case 403:
        result="Request is not permitted , please stop trying to access it.";
       break;
       case 404:
       result ="Request page or service not found.";
       break;
       default:
         result="The request was not enable to completed contact administrator.";
         break;
    }
  return result;
})




module.exports = ServerService;
