

var __router = null;
var __root   = '/';
var RouteHandler=(function(router)
{
  if(window){
  	 window.addEventListener("hashchange", this.handle.bind(this));
  	 __router = router;
  }
})

RouteHandler.prototype.handle=(function(evt){
	 var url   = location.hash.slice(1) || '/';
	 var url= "/"+url;
	 var path = (decodeURI(url+location.search));
	 var params =  parseParams(path);
	 path = path.replace(/\?(.*)$/, '');
	 if(__router){    
	 	__router.redirect(path,params);
	 }

})



/**
 The function parse the url of the current page
*/
var parseParams=(function(query){
var params ={};
var paramsURL = query.slice(query.indexOf("?")+1);
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, "")); }; 
    while (match = search.exec(paramsURL))
       params[decode(match[1])] = decode(match[2]);
})();

return params;
})

module.exports= RouteHandler;