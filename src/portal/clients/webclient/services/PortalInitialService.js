/**
 The service object initialised the portal , return the current client for this portal and the default page to load
 if its set for all the client else load the default client enable page
 @module system.services
 @author Obaro I. Johnson

*/

 var  ServerService = require("./ServerService.js");


  "use strict"
	/**
	  The portal initialised service object
	  @class
	  @param {Portal} portal an object instanceof a system.portals.Portal;
	*/
var PortalInitialService =Object.extends(ServerService,(function(version)
	{
	   PortalInitialService.superclass.constructor.call(this, "portalInitializer");
     this.version = version;
	}));


/**
The function listen to preevent of the portal function
 @class
@param {Portal} portal an object instanceof a system.portals.Portal;
*/

PortalInitialService.prototype.doInbackground=(function(request, url)
  {

    //Load the current client for the portal
     request.open(url);
     request.field("softwareVersion", this.version);
     request.field("service", "portalInitializer");
     request.send();

})


ServerService.prototype.onCancelExecute =(function(event){
if(this.reject){
  this.reject(event);
}
});

/**
 The method is called when the service has finished executing
 @method
 @member
 @param {mixtype} data the result data the services return
*/
PortalInitialService.prototype.onPostExecute=(function(data){
   try{
       var obj = JSON.parse(data);
       var status = Boolean(obj.status);
       if(status==true){
          if(this.resolve)
          	 this.resolve(obj);
       }else{
         this.reject(obj);
       }
     }catch(error)
     {
       this.cancel(error);
   }
});


/**
The method return a promise object and the parse result of the portal object.
@method execute
@return {Promise} promise object with the result of the request
*/
PortalInitialService.prototype.onErrorExecute =(function(event){
  this.onCancelExecute(event);
});



/**
The method return a promise object and the parse result of the portal object.
@method execute
@return {Promise} promise object with the result of the request
*/
PortalInitialService.prototype.execute=(function(url)
{
  return new Promise((function(resolve, reject){
   this.resolve =   resolve;
   this.reject  =   reject; 
   PortalInitialService.superclass.execute.call(this, url); 
  }).bind(this));
});


module.exports=PortalInitialService;
