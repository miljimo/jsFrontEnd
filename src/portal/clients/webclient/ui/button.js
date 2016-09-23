
"use strict"

var Component  = require("./component.js");
var uuid       = require('node-uuid');
require("../css/btn_fancy.css");

var Button =Component.extends(function(parent, text)
{
  Button.superclass.constructor.call(this, parent);
  Object.defineProperties(this, {"_btn_uuid":{value:("btn-fancy-ui"+uuid.v4()), writable:false, enumerable:false}});
  Object.defineProperties(this, {"_btn_uuid_wrapper":{value:("_btn_uuid_wrapper"+uuid.v4()), writable:false, enumerable:false}});
  Object.defineProperties(this, {"_btn_uuid_identicator":{value:("_btn_uuid_identicator"+uuid.v4()), writable:false, enumerable:false}});
  Object.defineProperties(this, {"_btn_uuid_icon":{value:("_btn_uuid_icon"+uuid.v4()), writable:false, enumerable:false}});
  this.__text = text?text:"Log In";
});


Button.prototype.getId=(function(){
   return this._btn_uuid;
})
Button.prototype.getWrapId=(function(){
   return this._btn_uuid_wrapper;
})

Button.prototype.getIdenticatorId=(function(){
   return this._btn_uuid_identicator;
})

Button.prototype.getIconId=(function(){
   return this._btn_uuid_icon;
})

Button.prototype.enable=(function(abool){
  var abool  =(typeof abool=='boolean')?abool:false;
  var domElemnt  = this.get();
  var btnDom     = document.getElementById(this._btn_uuid);

  if(!abool && domElemnt){
     btnDom.setAttribute("disabled", true);
     this.addClass( domElemnt, "disabled");
  }else{
     btnDom.removeAttribute("disabled");
     this.removeClass( domElemnt, "disabled");
  }
});


Button.prototype.hideIcon=(function(abool){

   var abool = abool?true:false;
   var iconDom = document.getElementById(this.getIconId());

   if(abool &&  iconDom){
     this.removeClass(iconDom, 'show-component');
     this.addClass(iconDom,  'hide-component');
   }else{
     this.addClass(iconDom, 'show-component');
     this.removeClass( iconDom, 'hide-component');
   }
});


Button.prototype.setName =(function(name){
  var btnDom = document.getElementById(this.getId());
   if(btnDom && typeof name =='string'){
      btnDom.setAttribute("name", name);
   }
});


Button.prototype.setText =(function(name){

  var btnDom = document.getElementById(this.getId());
   if(btnDom && typeof name =='string'){
      btnDom.setAttribute("value", name);
   }
});




Button.prototype.setIcon =(function(url){
   var btnDom = document.getElementById(this.getIconId());
   if(btnDom){
    var url = (typeof url !='string')?"":url;
    btnDom.style.backgroundImage="url("+url+")";
   }
 return this;
})

Button.prototype.setRightIcon =(function(url){
   var btnDom = document.getElementById(this.getIdenticatorId());
   if(btnDom){
     var url = (typeof url !='string')?"":url;
    btnDom.style.backgroundImage="url("+url+")";
   }
 return this;
})

Button.prototype.hideRightIcon =(function(abool){
  var abool = abool?true:false;
   var iconDom =  document.getElementById(this.getIdenticatorId());
   if(abool &&  iconDom){
     this.removeClass(iconDom, 'show-component');
     this.addClass(iconDom,  'hide-component');
   }else{
     this.addClass(iconDom, 'show-component');
     this.removeClass( iconDom, 'hide-component');
   }
})


Button.prototype.enableLoading =(function(status)
{
   var _is= (typeof status=='boolean')?status: _is;
   __enableLoading.call(this, _is);
   return true;
})
/**
The function return the makeup view of the button
 @method
 @memberof Button#
*/
Button.prototype.renderUI=(function(){
   var id          = this.getId();
   var idWrap      = this.getWrapId();
   var idIndicator = this.getIdenticatorId();
   var iconId      = this.getIconId();
	return (`
            <div class ='w3-btn btn btn-control-ui' id='${idWrap}'>
              <span class='btn-icon' id='${iconId}'></span>
              <input type ='button' value='button'  name='${id}' id='${id}'>
              <span class ='btn-loading-indicator' id='${idIndicator}''></span>
            </div>
		`);
});


/**
  The function is called when the button is created
 @method
 @memberof Button#
*/
Button.prototype.onCreate=(function(){
Button.superclass.onCreate.call(this);
var mainTag  = document.getElementById(this.getWrapId());
this.set(mainTag);
this.setText(this.__text);
this.on(this.get(), ["click", "touch"], (function(event)
  {
    var button = event.buttons;
    var x = event.clientX || event.layerX;
    var y = event.clientY  || event.layerY;
    this.onClick(button , x, y);
  }).bind(this));
});



Button.prototype.onClick =(function(button, x, y){
  console.warn("Button clicked event  not handled");  
})


Button.prototype.toString=(function()
{
  return "[object Button]";
})


Button.toString=(function()
{
  return "[class Button]";
})


var __enableLoading =(function(on)
{
   var btnIdenticator = document.getElementById(this.getIdenticatorId());
    if(on){      
       this.addClass(btnIdenticator, "loading");
    }else{
      this.removeClass(btnIdenticator, "loading");
    }
})
module.exports =Button;