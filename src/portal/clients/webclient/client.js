"use strict"


var IndexPage       = require("./ui/indexpage.js");
var Service         =require("./services/SService.js");
var Promise = require('promise-polyfill');
var setAsap = require('setasap');
var store    = require("./utils/LocalStorage.js");
var UUID     =require("node-uuid");
Promise._immediateFn = setAsap;

 var __INSTANCE      = __INSTANCE || null;
 var __hardwareVersion  =__hardwareVersion || "";
 //private variable
 var __ipAddress     = __ipAddress ||  null;
 var __os            = __os        || "unknown";
 var __browser       = __browser   ||  null;
 var __language      = __language  ||  null;
 var __folder        = __folder    ||   "";
 var __pageUrl       = __pageUrl   || "index";
 var __softwareVersion = __softwareVersion  || "";
 var __clientInfo     = __clientInfo || null;
 var __macAddress    = __macAddress || "";
 var __location      = __location  || "";
 var  __sessionUID   = null; 
 var  __param     =null;

 /**
  The class is the base of all portal client
  @class
  @extends Panel
 */

 var Client =(function(portal)
 {
   
 });
 
Client.prototype.userId=(function(userid){
  if(typeof userid=='string')
      store.setSession("__cuUUid", userid);
    return store.getSession("__cuUUid") || "";
});

 Client.prototype.setClientInfo=(function(clientInfo)
 {
   if(typeof clientInfo ==='object'){
      __clientInfo = clientInfo;
   }
   return this;
 });
/**
  The function get the client information 
*/
 Client.prototype.getClientInfo=(function(clientInfo)
 {   
      return __clientInfo; 
 });

/**
 The function set the current id address
   @method
   @memberof Client#
*/
 Client.prototype.setIpAddress=(function(ip_address){
   if(typeof ip_address =='string'){
        __ipAddress = ip_address;
      }
    return this;
 });

/**
 The function get the ipAddress of the current client
  @method
   @memberof Client#
*/
Client.prototype.getIpAddress=(function(){
   return __ipAddress;
});


/**
 The function set the current portal os
   @method
   @memberof Client#
*/

Client.prototype.setOs=(function(os){
   if(typeof os =='string'){
     __os = os;
   }
   return this;
})

/**
 The function get the current os the client is running on
   @method
   @memberof Client#
*/
 Client.prototype.getOs=(function()
 {
    return __os;
 })
 /*
  The function set the current broswer the portal is currently running on
   @method
   @memberof Client#

 */
 Client.prototype.setBrowser=(function(browser){
   if(typeof browser ==='string'){
     __browser  = browser;
   }
 });

 /**
  The function get the current broswer the portal is running on
   @method
   @memberof Client#
 */
 Client.prototype.getBrowser=(function(){
   return __browser;
 })

 /**
  The function set the current language of the that portal will run on
   @method
   @memberof Client#
 */
 Client.prototype.setLanguage=(function(language)
 {
    if(typeof language ==='string')
         __language = language;
    return this;
 })

 /**
  The function get broswer supported  language
   @method
   @memberof Client#
 */
Client.prototype.getLanguage=(function(language){
    return __language;
})


/**
The function set the folder directory of the client
 @method
 @memberof Client#
*/
Client.prototype.setMacAddress=(function(macAddress)
{
  if(typeof macAddress =='string'){
     __macAddress =macAddress;
  }
  return this;
});

/**
 The function get the client base directory
 @method
 @memberof Client#
*/

Client.prototype.getMacAddress=(function(){
  return  __macAddress;
})

/**
 The software set the current software version number 
 @method 
 @memberof Client#

*/
Client.prototype.setSoftwareVersion=(function(softwareVersion)
{
  if(typeof softwareVersion=='string' || typeof softwareVersion =='number'){
     __softwareVersion=softwareVersion;
  }
  return this;

})

/**
 The software get the current software version number 
 @method 
 @memberof Client#

*/
Client.prototype.getSoftwareVersion=(function()
{
  return  __softwareVersion

})


/**
 The software set the current software version number 
 @method 
 @memberof Client#

*/
Client.prototype.setHardwareVersion=(function(hardwareVersion)
{
  if(typeof hardwareVersion=='string' || typeof hardwareVersion =='number'){
     __hardwareVersion=hardwareVersion;
  }
  return this;

})

/**
 The software get the current software version number 
 @method 
 @memberof Client#

*/
Client.prototype.getHardwareVersion=(function()
{
  return  __hardwareVersion;

})


Client.prototype.getLocation=(function()
{
  return  __location;

})

Client.prototype.setLocation=(function(location)
{
   __location = __location;

})




/**
  The function set the default page url for the portal client
  @method
  @param {string} url the page filename to installed

*/

Client.prototype.setDefaultPage=(function(url)
{
  if(typeof url=== 'string'){
       __pageUrl = url;
   }
   return this;
})
/**
  The function return the default page url for the portal client
  @method
  @return  {string} url the page filename to installed
  
*/

Client.prototype.getDefaultPage=(function()
{
   return __pageUrl || "index";
})



/**
  The function set and get the current client session id
  @method
  @param {string} url the page filename to installed

*/

Client.prototype.setSessionId=(function(sessionId)
{
  if(typeof sessionId=== 'string'){
       __sessionUID =sessionId;
   }
   return this;
})


Client.prototype.getSessionId=(function()
{
   return __sessionUID;
})




/**
The function return the object name in a string format
@method
@memberof Client
*/
Client.prototype.toString=(function()
{
	 return "[object Client]";
})


/**

The function load the client information for registration that will be passed backed to the onRegisterClient 
method
@method
@return the method must return a promise object
*/
Client.prototype.onLoadClientInfo =(function(){

  return new Promise((function(resolve, reject)
    {
    
  }).bind(this));
})

/**
Attached the current portal engine to the client
*/

Client.prototype.attach =(function(portal){
   if(!this.portal){
       Object.defineProperties(this,{"portal":{writable:false, enumerable:false, value:portal}});
   }
})

/**

The function allow the client to registered itself to the portal server
@method
@return the method must return a promise object
@memberof Client#
*/


Client.prototype.onRegisterClient=(function()
{
   return new Promise((function(resolve, reject)
   {
   	 var service = new Service("registerClientService");
   	 service.doInbackground=(function(request, url)
   	 {
       request.open(url);
  	   request.field("clientIpAddress",  this.getIpAddress());
  	   request.field("clientMacAddress", this.getMacAddress());
  	   request.field("clientBrowser", this.getBrowser());
  	   request.field("clientHardwareVersion", this.getHardwareVersion());
  	   request.field("clientSoftwareVersion", this.portal.getVersion());
  	   request.field("clientLocation", this.getLocation()); 
  	   request.field("clientOs", this.getOs());   
  	   request.field("clientDefaultPage", this.getDefaultPage()); 
  	   request.field("service", service.getName());
  	   request.field("status", false);
  	   request.send();
   	 }).bind(this);
   	 service.execute(this.portal.getServerUrl()).then((function(data)
   	 	{
         try{
  			     var obj = JSON.parse(data);
  			     var status = Boolean(obj.status);
  			     if(status){
  			     	 var ss_id  = obj.clientSessionId;
  			     	 this.setSessionId(ss_id);
  			          resolve(this.getDefaultPage());
  			         //var sessionID  =  obj.
  			     }else{
  			       var error  = obj.error || obj.message || obj.response.error;
  			       reject(error);			      
  			     }
    			}catch(error){
    			    console.log(data);
    			     this.reject(data);
    			}
   	 	}).bind(this), (function(error)
   	 	{
        alert(error)
   	   }).bind(this))
    
    
   }).bind(this))
})


/**
 The function instruct the client to install its default page
  @method
  @param {url} pageur to install if its not already catched
*/

Client.prototype.changePageTo =(function(pagePath){
   if(typeof pagePath =='string'){
     this.portal.navigateTo(pagePath);
   }
});


Client.prototype.setParameters =(function(params){
   if(typeof params =='object'){
    __param = params;
   }
})


Client.prototype.onPageChange=(function(pageId, params)
{

    this.setParameters(params);
    return new Promise((function(resolve, reject){
      var service = new Service("updateSessionPageService");
      service.doInbackground=(function(request, url){
      request.open(url);
      request.field("changePageTo",pageId);
      request.field("service", service.getName());
      request.send();
    }).bind(this);
  //execute function to get the current page to load
    service.execute(this.portal.getServerUrl()).then((function(data)
    {
    	try{
	       	var obj = JSON.parse(data);
		    	var status = Boolean(obj.status);
			   if(status){
			     var ss_id  = obj.clientSessionId;
			     this.setSessionId(ss_id);          
			     resolve(obj.clientDefaultPage);
			   }
		}catch(error){
          reject(error);
		}
    }).bind(this), (function(error){
    	reject(error);
    }));
    }).bind(this));
});


Client.getInstance = (function()
{
   return __INSTANCE;
})


module.exports= Client;



