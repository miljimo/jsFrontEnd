
var Component = require("./component.js");
var uuid = require('node-uuid');
var $    = require("jquery");
require("../css/loading_dialog.css");
require("../css/modal_dialog.css");

var __title   =  "";
var __iconUrl =  "";
var __dialogId = __dialogId || "";

var __uiContent       = null;
var __uiMessage       = null;
var __uiReloadMessage = null;

var LoadingDialog =Component.extends(function(parent){
   LoadingDialog.superclass.constructor.call(this); 
   this.setParent(parent);
   __dialogId = "ui-dialog-"+uuid.v4();
});


/**
Override the onCreate method

*/
LoadingDialog.prototype.onCreate=(function(){
  LoadingDialog.superclass.onCreate.call(this);
   this.setUI();
  
})

LoadingDialog.prototype.setUI=(function()
{
  var __domDiv  = document.getElementById(""+__dialogId);
  this.set(__domDiv);
   var compParent  = this.getParent();
   var elParent =null;
   if(compParent){
       elParent = compParent.get();
   }
   var parent   = elParent || document;
  __uiContent = $(".ui-content.ui-modal-content", __domDiv)[0];
  if(__uiContent){
     __uiMessage = $(".ui-message",__uiContent)[0];
     __uiReloadMessage  = $(".ui-reloading-message",__uiContent)[0];
    $(__uiContent).height(150);
    $(__uiContent).width(300);
    var h = $(parent).height();
    var w = $(parent).width();
    this.get().style.height= h +"px";
    this.get().style.width = w +"px";
    var pos = $(this.get()).position();
   this.centerContent(pos, w, h); 
  } 
})



/**
Center the dialog content on the center of the div parent
*/
LoadingDialog.prototype.centerContent=(function(pos, w, h){
   var parentContent  = this.get();
   var position  = pos || $(this.get()).position();
   var w    =  w  || $(this.get()).width();
   var h    =  h  || $(this.get()).height();
  
  var parentHeight   = h * 0.5;
  var parentWidth    = w  * 0.5; 
  var contentWidth   = $(__uiContent).width() * 0.5;
  var contentHeight  = $(__uiContent).height()* 0.5;
  var centerX    = parentWidth- contentWidth + (position.left*0.5);
  var centerY    = parentHeight - contentHeight + (position.top*0.5);  
  $(__uiContent).css({"left":centerX+"px",top:centerY+"px"});
})


LoadingDialog.prototype.publish=(function(message){
  if(__uiMessage){
  	 $(__uiMessage).html(message);
  }
})


LoadingDialog.prototype.status=(function(message){
  if(__uiReloadMessage){
  	 $(__uiReloadMessage).html(message);
  }
})


LoadingDialog.prototype.renderUI=(function(){
	return (`
			<div id='${__dialogId}' class='ui-portal-loading-dialog ui-modal-dialog'>
				  <div class='ui-content ui-modal-content'>
				    <div class='ui-icon-image'></div>
				    <div class='ui-message'>
				    Please wait...
				    </div>
				    <div class='ui-reloading-message'></div>
				  </div>
			</div>
	 `)
});

LoadingDialog.prototype.updateUI=(function(){
 if(this.getParent()){
    this.setUI();
 }
});





module.exports=LoadingDialog;