
/**
Simple  Fancy Checkbox
@author Obaro

*/
"use strict"

var Component  = require("./component.js");
var uuid       = require('node-uuid');
var $          = require("jquery");
require("../css/checkbox.css");



var Checkbox =Component.extends(function(parent, text)
{
   Checkbox.superclass.constructor.call(this,parent);
   Object.defineProperties(this, {"__uuid":{writable:false, enumerable:false, value:"_checkbox_uuid"+uuid.v4()}});
   Object.defineProperties(this, {"__uuid_content":{writable:false, enumerable:false, value:"__uuid_content"+uuid.v4()}});
   Object.defineProperties(this, {"__uuid_ident":{writable:false, enumerable:false, value:"__uuid_ident"+uuid.v4()}});
   Object.defineProperties(this, {"__uuid_icon":{writable:false, enumerable:false, value:"__uuid_icon"+uuid.v4()}});
   Object.defineProperties(this, {"__check_uuid":{writable:false, enumerable:false, value:"__check_uuid"+uuid.v4()}});
   this.__label = (typeof text =='string') ?text:"";

});

Checkbox.prototype.onCreate =(function()
{
  Checkbox.superclass.onCreate.call(this);
  var el = document.getElementById(this.__uuid);
  this.set(el);
  var domCheck = document.getElementById(this.__check_uuid);
  this.setText(this.__label);
  this.on(this.get(), ["change","click", "touch"], (function(event)
   {
      var isCheck      = !domCheck.checked;
      domCheck.checked = isCheck;
      this.onChecked(domCheck.checked);
   }).bind(this));
});


Checkbox.prototype.isChecked =(function(){
	var domCheck = document.getElementById(this.__check_uuid);
	return  domCheck.checked;
})

Checkbox.prototype.setChecked =(function(abool){
	var domCheck = document.getElementById(this.__check_uuid);
	domCheck.checked = abool?true:false;
	return this;
})

Checkbox.prototype.onChecked =(function(status)
{
  this.hideIcon(status);	
});

Checkbox.prototype.setText=(function(text){
   if(typeof text !='string') return;

   var textNode  = document.getElementById(this.__uuid_content);
   if(textNode){
   	   textNode.innerHTML=text;
   }
   return this;
});


Checkbox.prototype.setIcon =(function(url){
 if(typeof url !='string') return;
   var iconNode  = document.getElementById(this.__uuid_icon);
   if(iconNode){
   	   iconNode.style.backgroundImage="url("+url+")";;
   }
   return this;
});

Checkbox.prototype.setIconText =(function(text){
  if(typeof text !='string') return;
   var iconNode  = document.getElementById(this.__uuid_icon);
   if(iconNode){
   	   iconNode.style.backgroundImage="url()";
   	   iconNode.innerHTML=text;
   }
   return this;
});

Checkbox.prototype.hideIcon =(function(status){
	var domIcon  = document.getElementById(this.__uuid_ident);
	var status  = status?true:false;
	if(domIcon){
		if(status==true)
		   $(domIcon).fadeIn();
		else{
			$(domIcon).fadeOut();
		}
	}
})


Checkbox.prototype.renderUI=(function()
{
	 var uuid__         = this.__uuid;
	 var uuid__content  = this.__uuid_content;
	 var uuid__ident    = this.__uuid_ident;
	 var uuid_icon      = this.__uuid_icon;
	 var check__uuid    = this.__check_uuid;
	return (`
             <div class='checkbox-ui' id='${uuid__}'>
              	<div  class='checkbox-ui-wrapper' id='${uuid_icon}'>
              	<input type='checkbox' class='ui-checkbox-label' id='${check__uuid}' /></span>
              	 </div>
             	<div class='checkbox-ui-content'  id='${uuid__content}'>             	  
             	</div>
              	<div class='checkbox-ui-ident' id='${uuid__ident}' >  </div>
             </div>
		`)
})

Checkbox.prototype.toString=(function()
{
	return"[object Checkbox]";
})

Checkbox.toString=(function()
{
	return"[class Checkbox]";
})


module.exports=Checkbox;