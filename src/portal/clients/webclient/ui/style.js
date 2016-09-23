/**
@author Obaro
*/

"use strict"
var uuid = require('node-uuid');
//keep track if the style sheet already loaded to prevent multiple loads
var __Styles = __Styles ||  [];
/**
 The class object hold information about the component object to created
 @class
 @constructor

*/
var Style =(function()
{
  Object.defineProperties(this,{"__links":{writable:false,value:[],enumerable:false}});
  this.isRender = false;
})

/**
 The function method add the current link style to the exists objects
 @method
 @member
 @return {ui.Style} this 

*/
Style.prototype.apply=(function(link)
{
	if(typeof link !='string')return;
   var link=  window.APP_CONFIG.__DIR+"/"+link;
	if(!__isLoaded(link)) {
        this.__links.push(link);
        __Styles.push(link);
	}
	return this;
})

/**
 The function remove the link style from the group of style theme to render for the component
 @method
 @memberof Style#
 @return {ui.Style}this;
*/
Style.prototype.unlink=(function(link){
  var link=  window.APP_CONFIG.__DIR+link;
	var index = __getLinkIndex.bind(this)(link);
  if(index >=0){
      this.__links.splice(index, 1);
  }
  return this;

});


/**
 The function copy the current styles into the parents ones
 @method
 @memberof Style#
 @return {ui.Style}this;
*/
Style.prototype.append=(function(style){	
	if(style instanceof Style)
	{
		var lists =  style.__links;
		for(var i=0; i < lists.length; i++){
			 var link = lists[i];
			 var index = __getLinkIndex.bind(this)(link);
			 if(index < 0)
				 this.__links.push(link);
		}
	}
  return this;
});


/**
 The function load the component style object
 @method
 @memberof Style#
 @return {ui.Style}this;
*/
Style.prototype.render =(function()
{
  if(this.isRender) return;
   var  stylelinks ="";
  for(var i=0; i < this.__links.length ; i++){
    var uuid_id = uuid.v4();
  	var openTag  = "<link";
  	var tagContent =" href='"+this.__links[i]+"?cache="+uuid_id+"' rel='stylesheet' type='text/css' />";
    stylelinks = stylelinks +  openTag+ tagContent;
  }
  var template = document.createElement("div");
  template.innerHTML = stylelinks;
  var nodes = Array.from(template.childNodes);
  nodes.forEach(function(node){
   document.head.appendChild(node);
  })
  this.isRender=true;
  return this;
});


//private method
var __getLinkIndex =(function(link){
    var index =-1;
	if(typeof link !='string') return index;

	for(var i=0; i < this.__links.length; i++){
		var temLink = this.__links[i].toLowerCase();
		var link = link.toLowerCase();
		if(temLink==link){
			 index = i;
			 break;
		}
	}
	return index;
})




//static method

var __isLoaded =(function(link){
	 if(typeof link !='string') return true;
    var isFound =false;
    for(var i=0; i< __Styles.length ; i++){
       var style = __Styles[i].toLowerCase();
       var link =  link.toLowerCase();
       if(style == link){
       	 isFound=true;
       	 break;
       }
    }
    return isFound;
})


module.exports=Style;