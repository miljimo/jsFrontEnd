require("../../cores/core.js");
var Service   = require("../SService.js");
var Promise   = require('promise-polyfill');
var $         = require("jquery");




var UserAuthenticationService = Object.extends(Service, (function(){
  UserAuthenticationService.superclass.constructor.call(this, "authoUserLoginService");


}))
UserAuthenticationService.prototype.info=(function(info){
	 if($.isPlainObject(info)){
	 	this.__info  = info;
	 }
   return this.__info || {username:"", password:""};
})
UserAuthenticationService.prototype.doInbackground=(function(request, url){
   var info  = this.info();
  request.open(url);
  request.setType("json");
  request.method("post");
  request.field("service", this.getName());
  request.field("c_username", info.username);
  request.field("c_password", info.password);
  request.send();
});




UserAuthenticationService.prototype.execute=(function(url, callback){

	if(typeof callback !=='function')return;
	if(!url)return;
	var promise = UserAuthenticationService.superclass.execute.call(this, url);
	promise.then((function(data){
      var status = new Boolean(data.status || false);
      if(status !=true){
      	 callback(false, {error:data.error || "unknown error"});
      	 return;
      }
      callback(true, data);
	}).bind(this),
	(function(error)
	{
      callback(false, "error":error)
	}).bind(this));


});


module.exports=UserAuthenticationService;