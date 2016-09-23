
"use strict"

try{


var LocalStorage =(function()
{
  

})

LocalStorage.clearAll=(function(){
	 LocalStorage.clearSession();
	 LocalStorage.clearLocal();

})

LocalStorage.clearSession=(function()
{
   if(typeof (Storage)!="undefined"){
   	for(var prop in window.localStorage){
		window.sessionStorage.removeItem(prop);
	}
	}else{
	   window.cookies ="";	
	}
})


LocalStorage.clearLocal=(function()
{
   if(typeof (Storage)!="undefined"){
   	for(var prop in window.localStorage){
		window.localStorage.removeItem(prop);
	}
	}else{
	   window.cookies ="";	
	}
})

LocalStorage.getSession=(function(key)
{
	if(typeof key !='string' )return
	if(typeof(Storage) !='undefined'){
		//storage
	    // Code for localStorage/sessionStorage.
	    return window.sessionStorage.getItem(key) || "";
	}else{
		//use cookies 
		__getCookie(key);
	}
});

LocalStorage.removeSession=(function(key)
{
	if(typeof key !='string')return;
	if(typeof(Storage) !='undefined'){
	   return  window.sessionStorage.removeItem(key);
	}else{
		//use cookies 
		__removeCookie(key);
	}
});

LocalStorage.setSession=(function(key, value)
{
	if(typeof key !='string'  || !value)return;
	if(typeof(Storage) !='undefined'){
		//storage
	    // Code for localStorage/sessionStorage.
	    window.sessionStorage.setItem(key, value);
	}else{
		//use cookies 
		__setCookie(key, value);
	}

});



LocalStorage.getLocal=(function(key)
{
	if(typeof key !='string' )return
	if(typeof(Storage) !='undefined'){
		return window.localStorage.getItem(key) || "";
		//storage
	    // Code for localStorage/sessionStorage.
	}else{
		//use cookies 
		return __getCookie(key);
	}
});

LocalStorage.removeLocal=(function(key)
{
	if(typeof key !='string' )return
	if(typeof(Storage) !='undefined'){
		return window.localStorage.removeItem(key);
		//storage
	    // Code for localStorage/sessionStorage.
	}else{
		//use cookies 
		return __removeCookie(key);
	}
});

LocalStorage.setLocal=(function(key, value)
{
	if(typeof key !='string'  || !value)return;

	if(typeof(Storage) !='undefined'){
		var value  = value.toString();
		window.localStorage.setItem(key, value);
		//storage
	    // Code for localStorage/sessionStorage.
	}else{
		//use cookies 
		__setCookie(key, value, 360);
	}
});

LocalStorage.sessionCheck=(function(key){
	var value  = LocalStorage.getSession(key);
	if(value !=null && value !="") return true;
	return false;
});
LocalStorage.localCheck=(function(key){
	var value  = LocalStorage.getLocal(key);
	if(value !=null && value !="") return true;
	return false;
})

LocalStorage.setSessionObject=(function(key, obj){
   if(typeof key !='string') return;
   if(typeof obj !="object") return;
   try{
   	 var jsonStr = JSON.stringify(obj);
     LocalStorage.setSession(key, jsonStr);
   }catch(error){
   	console.error(error);
   }
   
});

LocalStorage.getSessionObject=(function(key){
  try{
   if(typeof key !='string') return null;
   var jsonStr = LocalStorage.getSession(key);
   if(typeof jsonStr =="string" && jsonStr !="" ){
   	 return JSON.parse(jsonStr);
   }
  }catch(error){
      console.error(error);
      return null;
   }
});

LocalStorage.removeSessionObject=(function(key){
   return  LocalStorage.removeSession(key);
});


LocalStorage.toString=(function()
	{
		return "[static class Storage]";
	});

var __setCookie=(function(cname, cvalue, exdays) 
{
	if(typeof cname !='string' || !cvalue)return;
	exdays = (typeof exdays !='number')?0.1:exdays;
    var d = new Date();
    d.setTime(d.getTime() + (exdays *24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
});
//get the cookies
var __getCookie=(function(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
})

var __removeCookie = (function(cname){
	__setCookie(cname, "");
});
module.exports = LocalStorage;
}catch(error){
  console.log(error);
}
