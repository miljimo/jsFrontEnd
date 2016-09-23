"use strict" 

var Promise = require('promise-polyfill');
var setAsap = require('setasap');
Promise._immediateFn = setAsap;
var FileInfo  = require("./fileinfo.js");


var ScriptGenerator =system.extends(system.services.Service,(function()
	{
		ScriptGenerator.superclass.constructor.call(this, "ScriptGenerator");
	    var head = document.head ||document.body || document.createElement("head");
	        if(head){
	        	Object.defineProperties(this, {"head":{value:head, writable:false ,enumerable:false}});
	        }
	      Object.defineProperties(this, {"scripts":{value:[], writable:false ,enumerable:false}});
	      this.scriptCreateCount=0;
}));
    /**
    Load the give client and its theme if given
    */
ScriptGenerator.prototype.addScript=(function(url, async)
	{
      var async = (typeof async=='boolean')?async:false;
      if(typeof url==='string')
      {
           var fileInfo  = new FileInfo(url);
           if(fileInfo.extension!='js'){
             url = url +".js";
             console.log("Scripted converted to  "+url);
           }
          if(!this.isExists(url))
          {
          	 this.scripts.push(url);
          }
      }
	});



	ScriptGenerator.prototype.isExists=(function(url)
	{
      if(typeof url !='string') return true;
      for(var i=0; i < this.scripts.length; i++){
        var  ascript =  this.scripts[i];
        if(typeof ascript !='string') continue;
        if(ascript.toLowerCase()===url.toLowerCase()){
        	 return true;
        }
      }
	})

	ScriptGenerator.prototype.count=(function()
	{
		return this.scripts.length;
	})


	ScriptGenerator.prototype.execute=(function()
	{
    
	   return new Promise((function(resolve, reject){

          for (var i=0; i < this.scripts.length; i++)
          {
            
          	 var url  = this.scripts[i];            
          	  createScript.bind(this)(url , resolve, reject );
          }
	    }).bind(this));

	});



//private method to create the script

var  createScript = (function(filename, resolve, reject)
{
    var script = document.createElement("script");
          if(script)
          {

          	script.setAttribute("type","text/javascript");


          	//callback event when script is loaded
          	script.onload = (function()
            {
 	           this.scriptCreateCount= this.scriptCreateCount + 1;
 	           if(this.scriptCreateCount >= this.scripts.length){
 	          	resolve(true);
             }
            }).bind(this);
            //when there is error in loading the script
          	script.onerror=(function(error){
                console.log(error)
          	  this.scriptCreateCount++;
		          script.remove();
		      if(this.scriptCreateCount >= this.scripts.length)
		        {
		           reject("@Script: Unable to load file ["+script.src+"]");
		      }
            }).bind(this);
          script.setAttribute("src", filename); 
          if(this.head){
          	 this.head.appendChild(script);
          }
	  
	}
    
});

module.exports= ScriptGenerator;