"use strict" 

 require("../cores/core.js");
  require("../css/w3css.css");
 require("../css/component.css");

 var Style     = require("./style.js");
 var $    = require("jquery");
 var ComEvent  = require("./componentevent.js");
 

var COMPONENT_EVENTS = COMPONENT_EVENTS || {};
/**
   The base abstract component  class which every component extends from
   @class
   @param {Component} p the parent object
  */
var Component =(function(p)
  {
      if(typeof this.setParent !=='function')
        throw new Error("@Component: require a new statment to create new instance object");    
    var style = new Style();
    Object.defineProperties(this,{"__style":{"value":style, writable:false, enumerable:false}}); 
    Object.defineProperties(this,{"__params":{"value":style, writable:false, enumerable:false}});    
    Object.defineProperties(this,{"__components":{value:[], writable:false, enumerable:false}});   
    this.setParent(p);
    this.__isloaded = false;    

  })

Component.prototype.addComponent=(function(el, component){
  var components  = this.getComponents();

  if(el instanceof HTMLElement && (component instanceof Component)){
       if(!this.isExists(component)){
          component.setParent(this);
          component.setClient(this.getClient());
          components.push({element:el, "component":component});
       }
  }

  return this;
});

/**
Create an event object
*/
Component.prototype.createEvent=(function(type){
    var evt =  COMPONENT_EVENTS[type];
    if(evt)return ;   
   if(typeof type== 'string'){ 
     evt =new  ComEvent(type);
     COMPONENT_EVENTS[type] =   evt ; 
   }
});
 
/**
 The function empty the element
*/
Component.prototype.emit=(function(type){
   var evt =   COMPONENT_EVENTS[type];
   if(!evt) return this;
   evt.emit(this.get(), type);
   return this;
});



 /**
  The function is called when the component is created and what to send its ui
  @method
  @memberof Component#
  @return {Component} this ;
 */

 Component.prototype.setParameters=(function(params)
 {
  if(!params || params instanceof Array || typeof params !="object") return;
    for(var prop in params){
         this.__params[prop]= params[prop];
    }
    return this;
 })



 /**
  The function is called when the component is created and what to send its ui
  @method
  @memberof Component#
  @return {Component} this ;
 */

 Component.prototype.getParameters=(function()
 {
    return this.__params || {};
 })

  Component.prototype.getParameter=(function(name , defaultValue)
 {
   var d = (defaultValue)?defaultValue:null;
  if(typeof name !='string') return d;  
   return  this.__params[name]  || d ;
   
 })


 Component.prototype.setParameter=(function(name , avalue)
 {
   var d = (avalue)? avalue:null;
   if(d) return  null;
  if(typeof name !='string') return d;  
    this.__params[name]= avalue;
    return this;
   
 })

 Component.prototype.doLayout =(function(pElement){ 

   //load the component assets
  if(!this.isLoaded())
     {
      this.setUI();
      this.renderComponents();
      this.createComponents();
      this.onWrapContent(pElement);
      this.onViewCreated(this);     
      this.onCreate();

   }
  
  
  
  this.updateUI();
 });

 Component.prototype.onMobileView=(function()
 {
  
 })

 Component.prototype.renderStyle=(function()
 {

 })
   /**
 The function  get; set the current client of the component running on
  @method
  @memberof Component#
  @return {Component} this ;
 */

 Component.prototype.setClient=(function(client)
 {
   if(!this._client_){
      Object.defineProperties(this, {"_client_":{writable:false, enumerable:false, value:client}});
   }
   return this;
 })

  Component.prototype.getClient=(function()
 {
    return this._client_ || null;
   
 })

Component.prototype.isLoaded =(function()
{
  this.__isloaded = this.__isloaded || false;
})


 /**
  The function is called when the component is created and what to send its ui
  @method
  @memberof Component#
  @return {Component} this ;
 */

 Component.prototype.renderUI=(function()
 {
    throw new Error("@Abstract method require implementation")
 })


 /**
  The function is called anything the component require updated or when the broswer re-draw its self
  @method
  @memberof Component#
  @return {Component} this ;
 */

 Component.prototype.updateUI=(function()
 {
 
 })



 /**
  The function is called when the component view has be created 
  @method
  @memberof Component#
  @return {Component} this ;
 */
 Component.prototype.onCreate=(function()
 {
   this.__isloaded =true;
 })


  /**
  The function checked if the component require authentication
  @method
  @memberof Component#
  @return {Component} this ;
 */

 Component.prototype.isAuthenticated=(function()
 {
    return false;
 });

/**
  The function return the authenticated required page
  @method
  @memberof Component#
  @return {Component} this ;
 */


 Component.prototype.getAuthPage=(function()
 {
    return  "/";
 })

 /**
  The method that will set the domElement of the component for controlling
  @method
  @memberof Component#
  @return {Component} this ;
 */
 Component.prototype.set=(function(domElement)
 {
   if(domElement instanceof HTMLElement)
      if(!this.__el)
          Object.defineProperties(this, {"__el":{value:domElement, writable:false, enumerable:false}});
  return this;
 })



 /**
  The method that will get the domElement of the component for controlling
  @method
  @memberof Component#
  @return {DomElement} ;
 */
 Component.prototype.get=(function()
 {
  return this.__el;
 })






  /**
  The function is called anything the component require updated or when the broswer re-draw its self
  @method
  @memberof Component#
  @return {Component} this ;
  Component.prototype.styles=(function()
 {
   
    this.styleComponents(this.__style);
   return this.__style;   
 })
 */

 




 /**
  
  @method
  @memberof Component#
  @return {Component} this ;
 */
 
 /**
  The function set the parent of the  component
  @method
  @memberof Component#
  @param {Component} parent  the parent object to set 
  @return {Component} this ;
 */
 
 Component.prototype.setParent=(function(aparent){
  if(!this.__parent  && aparent instanceof Component)
  {
    Object.defineProperties(this,{"__parent":{writable:false, enumerable:false, value:aparent}});
  }
  return this;
 });

 /**
  The function return the parent of the  component
  @method
  @memberof Component#
  @param {Component} parent  the parent object to set 
  @return {Component} parent the parent component else null ;
 */

 Component.prototype.getParent=(function(){
  return this.__parent || null;
 })

 /**
  Add a css class to the component if its domElement exists
  @method
  @memberof Component#
  @param {domString} classname the css class name to added to the component
  @return {Component} parent the parent component else null ;
 */

 Component.prototype.addClass= (function(el, classname){
  var el = el || this.get();
  var classname = classname;
  if(typeof el ==='string'){
     classname = el;
     el = this.get();
  }
  if(!el)return this;
  if(typeof classname ==='string'){         
    __addClass(el, classname);
  }
  return this;
});

 /**
  remove a css class to the component if its domElement exists
  @method
  @memberof Component#
  @param {domString} classname the css class name to remove to the component
  @return {Component} parent the parent component else null ;
 */
Component.prototype.removeClass= (function(el, classname){
  var el  = el || this.get();  
  var classname = classname;
  if(typeof el ==='string'){
     classname = el;
     el = this.get();
  }
  if(!el)return;
  if(typeof classname ==='string'){
    __removeClass(el, classname);
  }else{
   var  classes = Array.prototype.slice.call(el.classList);
    for(var p in classes){
          var name = classes[p];
          if(typeof name ==='string')
            __removeClass(el, name);
           }
   }
})


 /**
  The function remove the listen event from the component
  @method
  @memberof Component#
  @return {Component} parent the parent component else null ;
 */
Component.prototype["off"]=(function(el, type, callback){     
  if(!el) return ;       
  var calls= callback || el["dom"+type];
  var typeArray = (type instanceof Array)?type:(typeof type=='string')?[type]:null;
  for(var i=0; i <typeArray.length ; i++ )
  {
     var type  = typeArray[i];
    if(el.removeEventListener){
      el.removeEventListener(type,calls);
    }else{
      el.detachEvent("on"+type,calls);
     }
  }
  
});

 /**
  The function remove the element from its parant
  @method
  @memberof Component#
  @return {Component} parent the parent component else null ;
 */

Component.prototype.on= (function(el, type, callback){   
  if(!el) return;
  if(typeof el =='string' || el instanceof Array){
     callback = type;
     type = [el];
     el = this.get();
  }

   if(typeof callback !=='function')return;
   var typeArray = (type instanceof Array)?type:(typeof type=='string')?[type]:null;
   for(var i=0; i <typeArray.length ; i++ )
   {
      var type  = typeArray[i];
      if(el.addEventListener)
      el.addEventListener(type, callback, false);
      else if(el.attachEvent)
        el.attachEvent("on"+type, callback, false); 
      el["dom"+type] = callback;
   }
 });


 /**
  The function remove the element from its parant
  @method
  @memberof Component#
  @return {Component} parent the parent component else null ;
 */
Component.prototype.dispose=(function(el)
{
  var el = el || this.get();
  if(!el) return this;
  if(el.remove)
      el.remove();  
  else{
      var parent =el.parentNode;
      if(parent){
         parent.removeChild(el);
      }
  } 
  return this;
})


/**
  The function add component to the element
 @method

*/

Component.prototype.getComponents=(function()
{
  if(!this.__components){
     Object.defineProperties(this,{"__components":{value:[], writable:false, enumerable:false}});
  }
  return this.__components;
})

/**
The function render the component to their below atteched element
 @method
 
*/

Component.prototype.renderComponents=(function()
{
  var components  =this.getComponents();
    for(var i=0; i < components.length; i++){
     var component = components[i].component;
     var el        = components[i].element;
     if(el instanceof HTMLElement){
      //append the ccomponent to the el
      var comHTML    = component.renderUI();
      var tempDiv    = document.createElement("div");
      var fragment   = document.createDocumentFragment();
      fragment.appendChild(tempDiv);
      tempDiv.innerHTML =comHTML;
      this.addClass(tempDiv, "ui-component");
      el.appendChild(fragment);

      //call the component to do its layout
      component.doLayout(el);
     }
  }

});



/**
 Append all the child component styles to the parents style for loading
 @method
 
*/
Component.prototype.styleComponents=(function(style)
{
  var components = this.getComponents();
  if(!style) return;
  for(var i=0; i < components.length; i++)
  {
    var component = components[i].component;
    if(component)
       style.append(component.styles());
  }
  return style;
})

/**
 The function called the created method of the components
 @method
 
*/

Component.prototype.createComponents=(function()
{
  var components  = this.getComponents();
    for(var i=0; i < components.length; i++){

    var component = components[i].component;    
    if(component)
      component.onCreate();
  }
})
/**
  The function update all its child components
 @method
 
*/
Component.prototype.updateComponents=(function()
{
  var components = this.getComponents();
    for(var i=0; i < components.length; i++){
    var component = components[i].component;
    if(component)
      component.updateUI();
  }
})



/**
 Function is called when both children and main components has be created
 @method
 
*/

Component.prototype.onViewCreated=(function(parent){
 
  //do nothing
})


/**
 Function is called when the view components need to be access and setup
 @method
 
*/

Component.prototype.setUI=(function()
{   
  
});



/**
 Check if the component already exists
 @method
 
*/

Component.prototype.isExists=(function(component){
  var isComp= (component instanceof Component);
  if(!isComp) return true; 
  var components  = this.getComponents();
  for(var i=0; i < components.length; i++){

    var comp = components[i].component;

    if(comp == component){
       return true;
    }
  }
  return false;
});



Component.prototype.onWrapContent=(function(pElement){
   //do nothing
  if(pElement instanceof HTMLElement){
     var h   = $(pElement).height();
     var w   = $(pElement).width();
     var pos = $(pElement).position();
     if(this.get()){
        $(this.get()).height(h);
        $(this.get()).width(w);
        $(this.get()).css({left:pos.left+"px", top:pos.top+"px"});
     }
  }
})


/**
 return the string format of the object name
 @method
 @return {DomString} the object in a string format
*/

Component.prototype.toString=(function(){
  return "[object Component]";
})


/**
 return the string format of the object name
 @method
 @return {DomString} the object in a string format
*/

Component.toString=(function(){
  return "[class Component]";
})

/**
 the function is used to identify a component
 @method
 @return {DomString} the object in a string format
*/

Component.__cclass__= "__component";


/**
   A static method that allow component inheritances
   @method
   @memberof Component
   @param {Component} parentComponent
   @param {Component} childConstructor

*/
Component.extends =(function(parentComponent, childConstructor)
{
  var _parent  = (parentComponent instanceof Component)?parentComponent:Component;
  if(typeof childConstructor !='function'){
      childConstructor = parentComponent;
  }
  return Object.extends(_parent, childConstructor);
});







//internal function 

 var __addClass =(function(el,classname)
  {
    if(el instanceof HTMLElement){

        if(!el.classList.contains(classname) && (typeof classname ==="string"))
        {
            el.classList.add(classname);
        }
    }
  })
              //remove a css class from the element
  var __removeClass =(function(el,classname)
    {
      if(el instanceof HTMLElement){
         if(el.classList.contains(classname) && (typeof classname ==="string"))
              el.classList.remove(classname);
          }
      return el;
    })

//end internal function


module.exports =Component;
