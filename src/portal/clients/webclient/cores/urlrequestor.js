

"use strict"
require("./core.js");
var ParameterBag = require("./parameterbag.js");
var $= require("jquery");


/**
 The class is used to send xml request to load server data
*/
var UrlRequest =(function(url)
{
  Object.defineProperties(this, {"__header":{value:new ParameterBag(), writable:false, enumerable:false}});
  Object.defineProperties(this, {"__parameter":{value:new ParameterBag(), writable:false, enumerable:false}}); 
   this._url = url?url:"";
   this._async =true;
   this._method="post";
   this._type="html";
});

UrlRequest.prototype.headers=(function()
{
  var obj={};
   this.__header.forEach(function(key, value){
       obj[key]=value;
   })
  return obj
})

UrlRequest.prototype.open =(function(url){
 if(typeof url =='string') 
        this._url = url;
  return this._url;
});

UrlRequest.prototype.method=(function(method){
 if(typeof method =='string'){
       var method = method.toLowerCase().trim();
       this._method = method;
  }
  return this._method
})
UrlRequest.prototype.timeout=(function(timeout){
  if(typeof timeout=='number'){
    this.timeout  = timeout;
  }
  return this.timeout || (1000 * 60);
});

UrlRequest.prototype.field=(function(key, value){
   this.__parameter.set(key,value);
})
UrlRequest.prototype.header=(function(key, value){
   this.__header.set(key,value);
})

UrlRequest.prototype.withCredentials=(function(abool){
  if(typeof abool =='boolean')
     this.withC = abool;
   return this.withC || false;
})
/**
 The function created and send the request 

*/

UrlRequest.prototype.send =(function(){
  var method   = this.method();
  var url      = this.open();
  var params   = this.getUrlParams();
  var async    = this._async;
  var dataType = this.getType();
  var timeout  = this.timeout();
  var credentials=this.withCredentials();
  var success=(function(response)
  {
     this.onComplete(response);
  }).bind(this);

  var error=(function(error){
     this.onError(error);
  }).bind(this)

  var headers =this.headers();

//the ajax request
  $.ajax({
       "url":url,
       "data":params,
       "success":success,
       "error":error,
       "dataType":dataType,
       "headers":headers,
       "method":method,
       "timeout":timeout,
       "xhrFields":{
        withCredentials: credentials
       }
  });
});



/**
 The function is called when the content is loaded from the server
*/
UrlRequest.prototype.onComplete=(function(response, status){
  console.warn(response);
});

/**
 The function is called when error occur during server request
*/
UrlRequest.prototype.onError=(function(error){
console.warn(response);
});



UrlRequest.prototype.setType =(function(xtype){
	if(typeof xtype !='string')
		  xtype='html';
   var type  = (xtype.trim().toLowerCase());
   this.type = type;
   return this;
});

UrlRequest.prototype.getType =(function(){
	return this.type || "html";
});


UrlRequest.prototype.setCache =(function(abool){
	this.isCache  = abool?true:false;
	return this;
});


UrlRequest.prototype.getUrlParams=(function()
{
   var params = "";
   var isFirst  =true;
   this.__parameter.forEach(function(key, value)
   {
		if(isFirst)
		{
			params = key+"="+value;
			isFirst=false;
		}else{
		 params = params +"&"+key+"="+value;
		}
   });
   return params;
});



UrlRequest.prototype.toString=(function()
{
	return "[object UrlRequest]";
})


UrlRequest.toString=(function()
{
	return "[class UrlRequest]";
});




module.exports = UrlRequest;