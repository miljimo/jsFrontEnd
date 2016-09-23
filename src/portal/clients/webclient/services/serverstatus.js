
"use strict"

/**
 The functiondecoded the server and client error codes to string format suitable for client to read and understand
*/
var getRequestStatusMessage =(function(status){
    var status  =status?status:0;
    switch(status){

    	case 0:
    	   result="No internet connection";
    	   break;
    	case 200:
    		result="ok";
    		break;
    	case 400:
    	   result="Bad request gateway, please check your internet connection again";
    	   break;
    	 case 403:
    	  result="Request is not permitted , please stop trying to access it.";
    	 break;
    	 case 404:
    	 result ="Request page or service not found";
    	 break;
    	 default:
    	   result="The request was not enable to completed contact administrator.";
    	   break;

    }
  return result;
})


module.exports =getRequestStatusMessage   ;
