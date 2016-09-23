
/**
 The file contain the module component to register the user
  @file  FormDialog.js
  @author Obaro

*/
"use strict"

var Component  = require("./component.js");
var uuid       = require("node-uuid");
var $          = require("jquery");
require("../css/form_dialog.css");

var  FormDialog = Component.extends(function(parent)
{
   FormDialog.superclass.constructor.call(this, parent);
   Object.defineProperties(this,{"__uuid_dialog":{value:"ui-dialog-"+uuid.v4(), writable:false, enumerable:false}});
   Object.defineProperties(this,{"__uuid_dialog_container":{value:"__uuid_dialog_container-"+uuid.v4(), writable:false, enumerable:false}});
   Object.defineProperties(this,{"__uuid_dialog_container_header":{value:"__uuid_dialog_container_header-"+uuid.v4(), writable:false, enumerable:false}});
   Object.defineProperties(this,{"__uuid_dialog_container_header_icon":{value:"__uuid_dialog_container_header-icon"+uuid.v4(), writable:false, enumerable:false}});
   Object.defineProperties(this,{"__uuid_dialog_container_header_title":{value:"__uuid_dialog_container_header-title"+uuid.v4(), writable:false, enumerable:false}});
   Object.defineProperties(this,{"__uuid_dialog__container_message":{value:"__uuid_dialog__container_message-"+uuid.v4(), writable:false, enumerable:false}});
   Object.defineProperties(this,{"__uuid_dialog_container_content":{value:"__uuid_dialog_container_content"+uuid.v4(), writable:false, enumerable:false}});
   Object.defineProperties(this,{"__uuid_dialog_container_footer":{value:"__uuid_dialog_container_footer"+uuid.v4(), writable:false, enumerable:false}});
    Object.defineProperties(this,{"__ui_dialog_header":{value:"ui_dialog_header"+uuid.v4(), writable:false, enumerable:false}});
  
  
});


FormDialog.prototype.doLayout=(function(parentEl){   
    var meDiv = document.getElementById(this.__uuid_dialog);
    this.set(meDiv);
    FormDialog.superclass.doLayout.call(this, parentEl); 

    if(this.getClient()){
      var platform =  this.getClient().getClientInfo();     
      var ism = false;
      if(platform){
         var isMobile =  platform.isMobile || false;
         ism  = new Boolean(isMobile);
      if(ism==true){
         this.onMobileView(ism);
      }
    }}
    
    
   
});

FormDialog.prototype.onMobileView=(function(abool)
{

})

FormDialog.prototype.getToolbar=(function(el){
 var toolbar = document.getElementById(this.__ui_dialog_header);
  return toolbar;

})
FormDialog.prototype.onWrapContent=(function(el){
  FormDialog.superclass.onWrapContent.call(this,el);
  this.centerContentOn(this.get())

})

FormDialog.prototype.getContentDiv =(function(){
	var contentUI = document.getElementById(this.__uuid_dialog_container_content);
	return contentUI;
})

FormDialog.prototype.getContainerDiv =(function(){
	var contentUI = document.getElementById(this.__uuid_dialog_container);
	return contentUI;
})
FormDialog.prototype.getMessageDiv=(function()
{
   return document.getElementById(this.__uuid_dialog__container_message);
})

FormDialog.prototype.getFooterDiv =(function(){
	var contentUI = document.getElementById(this.__uuid_dialog_container_footer);
	return contentUI;
})

FormDialog.prototype.getHeaderDiv =(function(){
	var contentUI = document.getElementById(this.__uuid_dialog_container_header);
	return contentUI;
})

FormDialog.prototype.setTitle =(function(text){
	var title = document.getElementById(this.__uuid_dialog_container_header_title);
	if(title){
       title.innerHTML=(typeof text =='string')?text:"";
	}
	return this;
});


FormDialog.prototype.setMessage=(function(message)
{
   var messageUI = document.getElementById(this.__uuid_dialog__container_message);
   if(messageUI){
     messageUI.innerHTML=(typeof message=='string')?message:"";
   }

})

FormDialog.prototype.setIcon =(function(url){
	var titleIcon = document.getElementById(this.__uuid_dialog_container_header_icon);
	if(titleIcon){
      titleIcon.style.backgroundImage=(typeof url =='string')?("url("+url+")"):"url()";
	}
	return this;
});






/**
 The function center the container on the give element
 @method
 
*/
FormDialog.prototype.centerContentOn=(function(el){

  var el = el || this.get().parentNode;
  if(el instanceof HTMLElement){
    var h = $(el).height();
    var w = $(el).width();
     $(this.get()).height(h);
     $(this.get()).width(w);
     var pos  = $(this.get()).position();
     this.centerContent(pos, w, h);
  }
});

/**
 The function center the component on the give rect position and height and width
 @method
 
*/
FormDialog.prototype.centerContent=(function(pos, w, h){
   var containerUI = document.getElementById(this.__uuid_dialog_container);
   if(containerUI){
    var parentContent  =  containerUI.parentNode || this.get();
    var position       =  pos || $(this.get()).position();
    var w              =  w   || $(this.get()).width();
    var h              =  h   || $(this.get()).height();
    var parentHeight    = h  * 0.5;
    var parentWidth     = w  * 0.5;
    var contentWidth    = $(containerUI).width() * 0.5;
    var contentHeight   = $(containerUI).height()* 0.5;
    var centerY         = (parentHeight - contentHeight) + position.top;  
    $(containerUI).css({"margin":"auto",top:centerY+"px"});
    this.isModal(true);
  }
});
/**
  The function enable ot diable dialog modalility
 @method
 
*/

FormDialog.prototype.isModal=(function(abool){

var ismodal  = (abool==true)?true:false;
var el = this.get();
if(!el)return;
var containerUI = document.getElementById(this.__uuid_dialog_container);
if(containerUI){
     this.addClass("ui-modal-class");
     this.addClass(containerUI, "ui-modal-content");
}else{
		this.removeClass("ui-modal-class");
    this.removeClass(containerUI, "ui-modal-content");
	}
 var el = this.get();
  if(el){
     return el.classList.contains("ui-modal-class");
}else{return false;}

});





/**
 The function add the component to the children component list and the element where the component will be append to
 @method
 
*/
FormDialog.prototype.renderUI=(function()
{
//uuid for the individual div components
  var ui_dialog       = this.__uuid_dialog;
  var ui_container    = this.__uuid_dialog_container;
  var ui_header       = this.__uuid_dialog_container_header;
  var ui_header_icon  = this.__uuid_dialog_container_header_icon;
  var ui_header_title = this.__uuid_dialog_container_header_title;
  var ui_message      = this.__uuid_dialog__container_message;
  var ui_content      = this.__uuid_dialog_container_content;
  var ui_footer       = this.__uuid_dialog_container_footer;
  var ui_dialog_header =this.__uuid_dialog__header;
 return(`
       <div class='w3-container ui-dialog' id='${ui_dialog}'>
        <div class='ui-dialog-header' id='${ui_dialog_header}'>
        </div>
        <div class='w3-card ui-container'  id='${ui_container}'>
           <div class='ui-header'  id='${ui_header}'> 
            <div class='ui-icon' id='${ui_header_icon}'> </div>
            <div id='${ui_header_title}' class='ui-title'>New User Registration</div>
            </div>           
           <div class='ui-content' id='${ui_content}'>
           <div class='ui-message' id='${ui_message}'>All fields are required.</div> 
            

           </div>
           <div class='ui-footer'  id='${ui_footer}'>   </div>
        </div>
       </div>
 	`)

});

FormDialog.prototype.toString=(function()
{
	return "object FormDialog";
})
FormDialog.toString=(function()
{
	return "class FormDialog";
})





module.exports = FormDialog;

