"use strict"

/**
 The function pre-created user registration and login validator.
 */

var Validator = require("../validator.js");


var validator  = new Validator();
validator.fields(
{	
	"username":{
     format:{pattern:"^[a-zA-Z0-9]*$",error:"Invalid username format given must start with character letters"},
     space:{pattern:"^[ \t\n\f\r]+", error:'Username could not start with a character space' , positive:false},
     digit:{pattern:"^[0-9]", error:'Username should not start with digit characters' , positive:false},
     length:{error:"Username should be more than three characters or letters", test:(function(){return  this.length > 3})}
    },
	"surname":{
     format:{pattern:"^[a-zA-Z]+[ a-zA-Z]*[a-zA-Z]$",error:"Your surname should start with alphabet character in the right format e.g Mc Cann or Johnson"},
     space:{pattern:"^[ \t\n\f\r]+", error:'Your surname cannot start with a white space' , positive:false},
     digit:{pattern:"^[0-9]", error:'Your surname should not start with digit characters' , positive:false},
     length:{error:"Surname should be more than three characters or letters", test:(function(){return  this.length > 2})}
	},
	"firstname":{
     format:{pattern:"^[a-zA-Z]+[ a-zA-Z]*[a-zA-Z]$",error:"Your firstname should start with alphabet character in the right format e.g Mc Conor or John"},
     space:{pattern:"^[ \t\n\f\r]+", error:'Your firstname cannot start with a white space' , positive:false},
     digit:{pattern:"^[0-9]", error:'Your firstname should not start with digit characters' , positive:false},
     length:{error:"Firstname should be more than three characters or letters", test:(function(){return  this.length > 2})}
	},
	"email":{
      format:{
      		pattern:"(^[a-zA-Z])+([a-zA-Z0-9_\\.]+)@([a-zA-Z0-9]+)\\.([a-zA-Z]{2,4})$",
      		error:"Enter a valid email address format e.g someone@yahoo.com"
   		 }
   	},
    "password":{
    	length:{
    		test:(function(){return this.length >= 6}),
    		error:"Your password should be more than 6 characters for security reasons"
    	},
    	lower:{
    	 	pattern:"[a-z]+" , 
    	 	error:"Your password should have combination of lower case letters", 
    	 	poitive:false
    	 },
        upper:{
    	 	pattern:"[A-Z]+" , 
    	 	error:"Your password should have combination of upper case letters", 
    	 	poitive:false
    	 },
    	number:{
    	 	pattern:"[0-9]+" , 
    	 	error:"Your password should have combination of digit(s)", 
    	 	poitive:false
    	 }
    }
});

module.exports = validator;