"use strict"
var Component= require("./component.js");
var Style    = require("./style.js")
var $        = require("jquery");


var __mainElement = null;
var __loaded =false;



/**
*/
var Renderer =(function(domElement)
{   
    __mainElement  = domElement;
    if(__mainElement){
      __mainElement.style.display="block";
      __mainElement.style.position="fixed";
      __mainElement.style.width="100%";
      __mainElement.style.height="100%";
      __mainElement.style.overflow="hidden";
      __mainElement.style.padding="0px";
      __mainElement.style.margin="0px";
       __mainElement.style.border="0px";

    }
});


/**
 The function render the component to the main screen
*/

Renderer.prototype.render=(function(comp, callback)
{
	$(window.document).ready(function()
	{
       __simpleRender.bind(this)(comp, __mainElement, callback);
	})
});


Renderer.prototype.renderWith =(function(comp, domElement, callback)
{
	if(domElement instanceof HTMLElement && comp instanceof Component)
  {
     __simpleRender.bind(this)(comp, domElement, callback);
     if(__mainElement){
      __mainElement.appendChild(domElement);
     }
  }
  		

})

Renderer.prototype.get =(function()
{
	return __mainElement;
})



var __simpleRender =(function(comp, domElement, callback)
{
	var fragment = document.createDocumentFragment();
	fragment.appendChild(domElement);
	var comp = (comp instanceof Component)?comp : null;
	if(!comp)return;
	  var html     = comp.renderUI();
    comp.renderStyle();
    domElement.innerHTML=html;
    if(!__loaded){
	  	window.document.body.appendChild(fragment); 
	  }
    comp.doLayout(domElement);    
    if(callback){
    	callback(domElement);
    }
});




module.exports = Renderer;
