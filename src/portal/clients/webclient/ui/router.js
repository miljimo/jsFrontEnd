
"use strict"
var RouteHandler  = require("./routehandler.js");
var Component     = require("./component.js");
var Timer         = require("../utils/Timer.js");
var __route_collections = __route_collections || [];
var __routeHandler      = __routeHandler || null;
var __root             = __root || "/";
var __currentLocation  = __root;
var __listenonChange   = null;


var Router =(function(portal)
{
    if(!portal){
        throw new Error("@Error Route: the constructor require portal object as the first parameter");
    }
    Object.defineProperties(this, {"portal":{value:portal, writable:false, enumerable:false}});
  __routeHandler= new RouteHandler(this);

});


Router.prototype.add=(function(path, templateId, component){
    if(typeof path ==='string'){
       path  = __root + __clearSlashes(path);
       var re  = new RegExp('^('+path+')$');
       if(!__isExists(path)){
         var templateId = templateId.toString().toLowerCase();
         __route_collections.push({"re":re, id:templateId, controller:component, "path":path.toLowerCase()}); 
       }
       
    }
});

Router.prototype.redirect=(function(path,  params)
{
  var  isFound= false;
    
   for(var i=0; i < __route_collections.length; i++)
     {  var path = path.toString();
        var match = path.match(__route_collections[i].re);
        if(match){
           match.shift();
           isFound=true;
           var handle =  __route_collections[i]; 
           var _crl = handle.controller;
           if(typeof _crl =='function'){
               if(_crl.__cclass__){
                  //component class
                  if(this.portal){
                    this.portal.onInstallPage(handle.id);
                  }
               }else
                _ctr(params);
           }

           return this;   
        }
     };

if(!isFound){
    this.portal.onInvalidPage(path, params);
}
});
Router.prototype.flush= (function() {
   __route_collections = [];  
  return this;
});


Router.prototype.getRoute =(function(path)
{
   if(typeof path !='string')return null;
   path  = __root + __clearSlashes(path);
   var path  = path.toLowerCase();
  for(var i=0; i < __route_collections.length; i++){
      var route=  __route_collections[i];
      var match = path.match(route.re);
      if(match){
        return route;
      }
  }
  return null;
});

Router.prototype.navigate = function(path) {
        var path = (typeof path =='string') ? __clearSlashes(path) : ''; 
        if(this.mode === 'history') {
            history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#'+ path;
            //location.reload();
        }

   return this;
 }






var  __clearSlashes= (function(path) {
    if(typeof path =='string')
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    return "";
});  


var __isExists =(function(path)
{
   var _is= false;
   for(var i=0; i < __route_collections.length; i++){
     var match = path.match(__route_collections[i].re);
     if(match){
         _is=true;
         break;
     }
    
   }
   return _is;
})

module.exports =Router;