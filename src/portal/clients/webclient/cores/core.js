if(!core)var core={};
/**
The current module is the polyfill for the Object.assign function
@method
@memberof Object
*/
if(typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}


/**
Polyfil for extends function

**/
 if(typeof Object.extends !='function')
 {
    Object.extends =(function(aparent, construct)
    {
     'use strict';
     try{
         var construct = (typeof construct ==='function')?construct:(function(){});
          if(typeof aparent !=='function') return construct;
          var subclass = construct;
            for (var prop in aparent){
              subclass[prop]= aparent[prop];
            }
          subclass.prototype = Object.create(aparent.prototype); 
          subclass.superclass = aparent.prototype;
          //repair the subclass constructor
          subclass.prototype.constructor = construct;
          return subclass;  

     }catch(error){
      console.log(error);
     }
  });
 }


 /**
  Polyfil for the javascript trim method
 */

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
module.exports =  core;



