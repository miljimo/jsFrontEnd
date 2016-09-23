
"use strict";

/**
Parameter bag object implmentations
*/
var ParameterBag =(function()
{
  Object.defineProperties(this, {"__params":{value:[], writable:false, enumerable:false}});

});

ParameterBag.prototype.set=(function(key, value)
{
	if(typeof key=='string')
	{
		if(value){
			if(this.exists(key)){
				this.remove(key);
			}
			this.__params.push({"key":key, "value":value});
		  }
	}
	return this;
});

ParameterBag.prototype.add=(function(key, value)
{
	if(!this.exists(key)){
		this.set(key,value);
	}
	return this;
});

ParameterBag.prototype.exists=(function(key){
	if(typeof key !='string')return true;
  for (var i=0; i < this.__params.length; i++)
  {
        if(key== this.__params[i].key){
        	return true;
        }
  }
  return false;
})


ParameterBag.prototype.get=(function(key, valueDefault)
{
	var valueDefault  = valueDefault?valueDefault:null;
	if(typeof key=='string')
	{
		for(var i=0; i < this.__params.length; i++){
			 if(key == this.__params[i].key){
			 	valueDefault = this.__params[i].value;
			 	break;
			 }
		}
	}
	return valueDefault || null;
});
ParameterBag.prototype.insert=(function(key, value)
{
	var index = -1;
	if(typeof key=='string'){
         for(var i=0; i < this.__params.length; i++){
         	if(key==this.__params[i].key){
         		index =i;
         		break;
         	}
         }
	}
	if(index >0){
		this.__params[index]= {"key":key, "value":value};
	}else{
		this.__params.push({"key":key, "value":value});
	}
  return this;
});
ParameterBag.prototype.values =(function()
{
	var __values =[];
	for(var i=0; i < this.__params.length; i++){
		__values.push(this.__params[i].value);
	}
	return __values;
})
ParameterBag.prototype.keys =(function()
{
	var __keys =[];
	for(var i=0; i < this.__params.length; i++){
		__keys.push(this.__params[i].key);
	}
	return __keys;
});
ParameterBag.prototype.getInteger=(function(key)
{
	return  parseInt(this.get(key)) || 0;
});

ParameterBag.prototype.getBoolean=(function(key)
{
	return  new Boolean(this.get(key) || false);
});

ParameterBag.prototype.getString=(function(key)
{
	return  String(this.get(key) || "") ;
});

ParameterBag.prototype.parseFloat=(function(key)
{
	return  parseDouble(this.get(key) || 0.0);
});

ParameterBag.prototype.indexAt=(function(index)
{
	if(index >=0 && index <this.count()){
       return this.__params[index];
	}
	return null;
});

ParameterBag.prototype.count=(function()
{
	return this.__params.length;
});

ParameterBag.prototype.remove=(function(key)
{
	var index =-1;
	if(typeof key !='string')return;
	var key = key.trim().toLowerCase();
	for(var i=0; i < this.count(); i++){
		var tempKey  = this.__params[i].key.trim().toLowerCase();
		if(tempKey=== key){
           index = this.__params.splice(i,1);
			break;
		}
	}
	return  index;
});
ParameterBag.prototype.removeAt=(function(index)
{
    var value = this.indexAt(index);
    if(value && value.key){
    	 return this.remove(value.key);
    }
	return this;
});


ParameterBag.prototype.forEach=(function(callback)
{    
	if(typeof callback !='function')return;
     for(var i=0; i < this.__params.length; i++)
      {
     	var data  = this.__params[i];
     	callback(data.key, data.value);
     }
});

ParameterBag.prototype.empty=(function()
{
	this.__params.splice(0, this.count());
})

ParameterBag.prototype.toString=(function()
{
	 return "object ParameterBag";
})

ParameterBag.toString=(function()
{
	 return "class ParameterBag";
})

module.exports=ParameterBag;

