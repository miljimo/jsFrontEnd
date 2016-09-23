
"use strict"
var Component = require("./component.js");
var ParameterBag = require("../cores/parameterbag.js");
var $            = require("jquery");


/**
 The class module is a javascript validator build arround regular expression.
@author Obaro i. Johnson
*/

var Validator=  (function()
{
  Object.defineProperties(this, {"errorset":{"value":new ParameterBag(), writable:false, enumerable:false}});
  Object.defineProperties(this, {"fieldset":{"value":new ParameterBag(), writable:false, enumerable:false}});
});

Validator.prototype.field =(function(fieldname,  criteria )
{
   if(typeof fieldname=='string'){
     if($.isPlainObject(criteria)){
        var fieldbag  = this.fieldset.get(fieldname);
        if(!fieldbag)
            fieldbag = new ParameterBag();
        //add all the critable for the given field
        for(var prop  in criteria){         
            var temp = criteria[prop];            
            if($.isPlainObject(temp)){
                temp.get= this.fieldset.get;
                fieldbag.set(prop, temp);                
            }
        };      
       this.fieldset.set(fieldname, fieldbag);
     }
   }
});

Validator.prototype.fields =(function(_mulcriteria)
{
    if($.isPlainObject(_mulcriteria)){
       for(var prop in _mulcriteria){
          var field  = _mulcriteria[prop];
          if($.isPlainObject(field)){
            //new javascript scope 
             (function(name , criteria)
             {
                this.field(name , criteria);
             }).bind(this)(prop,field);
          }
       }
    }
});
/**
For each field set iterator function
*/
Validator.prototype.forEach =(function(value, callback)
{
    if(typeof  callback !='function') return;
     this.fieldset.forEach(function(fieldname, bag){
       if(bag instanceof ParameterBag){
             bag.value   = value || "";
             bag.length  = value.length
             bag.forEach((function(type, criteria){
             criteria.pattern = (criteria.pattern)? new RegExp(criteria.pattern):RegExp("");
             criteria.require = (typeof criteria.require=='boolean')?criteria.require:true;
             criteria.positive = (typeof criteria.positive=='boolean')?criteria.positive:true;
             criteria.error = (typeof criteria.error=='string')?criteria.error:fieldname+" is not valid base on "+type;
             criteria.test  =(typeof criteria.test =='function')?criteria.test :(function(){return true}); 
             criteria.value  = bag.value;
             criteria.length = bag.length;
             callback(fieldname, type, criteria);              
           }))
       }
    })
});
/**
 The function validated the fields criteria against the data pair value fields object provided
 @param 
*/

Validator.prototype.valid=(function(data)
{
  this.errorset.empty();
  var data= ($.isPlainObject(data))?data:{};
  for(var prop in data){    
      this.generate(prop, data[prop]) 
   }
 return (this.errorset.count() == 0);
});



Validator.prototype.generate =(function(name, value)
{
  
   if(typeof value!='string') return ;

   this.forEach(value, (function(fieldname, type, criteria){
    if(name == fieldname){
        var isMatch = this.match(criteria.pattern, value, criteria.positive);
        if(!isMatch){
            if(criteria.require){
               this.errorset.add(fieldname, {"type":type, field:fieldname, error:criteria.error});
            }
        }else{
           //check if the external test is positive
         if(!criteria.test()){
              this.errorset.add(fieldname, {"type":type, field:fieldname, error:criteria.error});
          }
        }
    }//end name
   }).bind(this));

  
})

/**
 The function matched if the pattern mateched the value
 @param {RegEx} pattern
 @param {string} value the value to test matched
 @param {boolean} donotNagate  false to change negate the return value else true to keep it same
  the default value is true.
*/

Validator.prototype.match=(function(pattern, value, donotNagate){
  var  test =false;
  var  pattern = (typeof pattern == 'string')?new RegExp(pattern):pattern;
  var  value   = (typeof value =='string')?value: "";
  var donotNagate = (typeof donotNagate =="boolean")?donotNagate:true;
   if(pattern instanceof RegExp){
     var test = pattern.test(value);
     if(!donotNagate){
        test = !test;
     }
   }
  return test;
})
Validator.prototype.errors=(function(callback){
  if(typeof  callback !='function')return;
  this.errorset.forEach(function(key, data){
     callback(data.field, data.error);
  });
});

Validator.prototype.count=(function()
{

  return this.fieldset.count();
})

module.exports = Validator;
