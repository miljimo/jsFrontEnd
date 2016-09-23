


/**
 Get the user details and update the view
*/
require("../../cores/core.js");
var Service   = require("../SService.js");
var View      = require("../../ui/component.js");
var Promise   = require('promise-polyfill');
var $         = require("jquery");

/**
 The function  send  user registration request to the server with the given data
*/

var UserRegistrationService = Object.extends(Service, (function(view)
{
	UserRegistrationService.superclass.constructor("registerUserService");
	if(view instanceof View){
		 Object.defineProperties(this, {"view":{value:view, writable:false, enumerable:false}});
	}else throw new Error("UserRegistrationService@ require first parameter to be component view ");
}));
UserRegistrationService.prototype.setData =(function(info){
 if(typeof info !='object')return this;
 this.info =info;
 return this;
});

UserRegistrationService.prototype.doInbackground =(function(request, url){
 	if(typeof url=='string' && typeof this.info =='object'){
        var info  = this.info;
        request.open(url);
        request.field("service", this.getName());
        request.field("c_lastname", info.surname 	|| "");
        request.field("c_firstname", info.firstname || "");
        request.field("c_email", info.email 		|| "");
        request.field("c_password", info.password 	|| "");
        request.field("c_username", info.username 	|| "");
        request.setType("json");
        request.send();
 	}
});


UserRegistrationService.prototype.execute=(function(url, callback)
{    
    if(this.Inprogress)return ;
	this.Inprogress =true;
	var promise  = UserRegistrationService.superclass.execute.call(this,url);
	promise.then((function(data)
	{
		var status  = new Boolean(data.status);
		if(status!=true){
	       callback(false, {"error":data.error});	     
		}else{
            callback(true, data);
		}

		this.Inprogress=false;
       //continue here;
	}).bind(this),(function(error){
		if(this.view)
			this.view.response(false, {"error":error});
	 this.Inprogress=false;
	}).bind(this))
	;
})
module.exports= UserRegistrationService;




