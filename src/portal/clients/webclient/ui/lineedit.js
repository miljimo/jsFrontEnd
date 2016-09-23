
"use strict"

var Component  = require("./component.js");
var uuid       = require('node-uuid');
require("../css/edit_line.css");


var LineEdit =Component.extends(function(parent,isPassword)
{
  if(typeof isPassword=='string'){
  	this.__label  = isPassword;
  	isPassword= false;
  }
  LineEdit.superclass.constructor.call(this, parent);
  Object.defineProperties(this, {"_lineedit_uuid_wrap":{value:("_lineedit_uuid_wrap"+uuid.v4()), writable:false, enumerable:false}});
  Object.defineProperties(this, {"_lineedit_uuid":{value:("_lineedit_uuid"+uuid.v4()), writable:false, enumerable:false}});
  Object.defineProperties(this, {"_lineedit_uuid_indicator":{value:("_lineedit_uuid_indicator"+uuid.v4()), writable:false, enumerable:false}});
  Object.defineProperties(this, {"__lineedit_uuid_label":{value:("__lineedit_uuid_label"+uuid.v4()), writable:false, enumerable:false}});
  this.isPassword =  (isPassword)?true:false;

});



LineEdit.prototype.setText=(function(text){
	var domText  = document.getElementById(this._lineedit_uuid);
	if(domText){
	 	domText.setAttribute("value", text || "");
	 	
	}
})

LineEdit.prototype.getText=(function(){
	var domText  = document.getElementById(this._lineedit_uuid);
	if(domText){
		return domText.value;
	}
	return "";
});

LineEdit.prototype.setLabel=(function(text){
	 if(typeof text =='string'){
	 	 var domlabel  = document.getElementById(this.__lineedit_uuid_label);
	 	  if(domlabel){
	 	  	domlabel.innerHTML= text;	 	  	
	 	  }
	 }
})
LineEdit.prototype.setPlaceholder =(function(text)
{
	if(typeof text !=='string') return this;
	var domText  = document.getElementById(this._lineedit_uuid);
	if(domText){
	 	domText.setAttribute("placeholder", text);
	 }
  return this;
})


LineEdit.prototype.handleEvent=(function()
{
 var domText  = document.getElementById(this._lineedit_uuid);
   this.on(domText, ["keyup","change"], (function(event){
   	 var text  = domText.value;
   	 this.emit("textchange");
   	this.onTextChange.call(text);
   }).bind(this));
});


LineEdit.prototype.onTextChange=(function(text)
{
  
});


LineEdit.prototype.enable =(function(abool){
	var status  = (typeof abool=='boolean')?abool:false;
	var domText  = document.getElementById(this._lineedit_uuid);
	if(!status){
		domText.setAttribute("disabled", true);
		__fadeText.bind(this)(!status);
	}else{
		domText.removeAttribute("disabled");
		__fadeText.bind(this)(!status);
	}
	return this;

})


LineEdit.prototype.renderUI=(function()
{
	 var uiWrap       = this._lineedit_uuid_wrap;
	 var uiLabelEdit  = this.__lineedit_uuid_label;
	 var uiUid        = this._lineedit_uuid;
	 var uiIndicator  = this._lineedit_uuid_indicator;
	return (`
            <div class ='edit edit-text-control-ui' id='${uiWrap}'>
              <span class='edit-label' id='${uiLabelEdit}'>label</span>
              <input type ='text' value=''  name='${uiUid}' id='${uiUid}' placeholder=' Type here'>
              <span class ='edit-loading-indicator' id='${uiIndicator}''></span>
            </div>
		`);
})


LineEdit.prototype.setType=(function(type){
	if(typeof type=='string'){
		var domInput  = document.getElementById(this._lineedit_uuid);
		domInput.setAttribute("type", type);
	}
})

/**
 The function is called when  the button is pressed
*/

LineEdit.prototype.onCreate=(function()
{
	LineEdit.superclass.onCreate.call(this);
	var domEl = document.getElementById(this._lineedit_uuid_wrap);
	this.set(domEl);
	var domInput  = document.getElementById(this._lineedit_uuid);
	if(domInput){
		if(this.__label){
			 this.setLabel(this.__label);
			 this.setPlaceholder(this.__label);
		}
		domInput.setAttribute("type", (this.isPassword)?"password":"text");
		if(this.isPassword){
			var labelPassword = document.getElementById(this.__lineedit_uuid_label);
			if(labelPassword){
				labelPassword.innerHTML="Password";
				 var idenicator =  document.getElementById(this._lineedit_uuid_indicator);
				 if(idenicator)
					this.addClass(idenicator, "password-icon");
			}
		}
	}
	this.createEvent("textchange");
	this.handleEvent();

});




var __fadeText=(function(abool)
{
	 var abool  = abool?true:false;
	 var el = this.get();
	 var domText  = document.getElementById(this._lineedit_uuid);
	 var domLabel = document.getElementById(this.__lineedit_uuid_label);
	 if(abool){
	 	
	 	 this.addClass(el, "txt-disable");
	 	 this.addClass(domText, "txt-disable");
	 	 this.addClass(domLabel, "txt-disable");
	 }else{
        this.removeClass(el, "txt-disable");
	 	this.removeClass(domText, "txt-disable");
	 	this.removeClass(domLabel, "txt-disable");
	 }

})



module.exports =LineEdit;
