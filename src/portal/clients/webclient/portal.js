/**
  The system module base portal engine interface abstract class
  @author Obaro
  @date 22/08/2016

*/


 "use strict" 
  var Component        = require("./ui/component.js");
  var LoadingDialog    = require("./ui/loadingdialog.js");
  var Renderer         = require("./ui/renderer.js");
  var Service          = require("./services/SService.js");
  var Timer            = require("./utils/Timer.js")
  var Client           = require("./client.js");
  var UUID 			       = require('node-uuid');
  var $    			       = require("jquery");
  var Router           = require("./ui/router.js");
  var store            = require("./utils/LocalStorage.js");
  var VERSION 						= "0.1" ;
  var NAME    						= "Portal";
  var RELOAD_ATTEMPT 				=  0;
  var RELOAD_FROM_SERVER 			=  false;
  var REQUIRE_RELOADING_ATTEMPT 	=  3;
  var PORTAL_CLIENTS_DIR 			=  "clients/";

  var __renderer					=  null;
  var __loadingDialog               =  null;
  var __uuid                        =  null;
  var __reloadTimer                 =  null;
  var __client                      =  null;
  var __router                      =  __router || null ;
  var __PAGE_CACHE                  = __PAGE_CACHE || {};
  var __PREVIEW_PAGE = null;
  /**
   The portal engine class
   @class
   @extends system.services.Service
  */

  var Portal = Component.extends(function(serverURl)
  {
  	Portal.superclass.constructor.call(this);
    if(typeof serverURl !=='string')
        throw new TypeError("@Portal: unable to connect to the given portal address "+ server);
        Object.defineProperties(this,{"serverURL":{value:serverURl, writable:false, enumerable:false}});
        __loadingDialog  = new LoadingDialog(this);
        __uuid    = "ui-web-portal-"+UUID.v4();    
  })

  Portal.prototype.getName=(function()
  {
     return "portal";
  });

  /**
   The function connect to the server to initialised the portal client folder to used
  */
  Portal.prototype.onInitialize  = (function()
  {
   var dialog  = this.getLoadingDialog();
   dialog.publish("Connecting to server...");
   var service = new Service("initService");
   service.doInbackground=(function(request, url){
     request.open(url);
     request.field("service", service.getName());
     request.setType("json");
     request.send();
   }).bind(this);
   service.execute(this.getServerUrl()).then((function(data)
   {
       var status = Boolean(data.status);
       if(status==true){
         this.onInstallPage(this.getClient().getDefaultPage());
         dialog.dispose();
         return;
       }
       this.dialog.publish("Unable to initialised the portal");
  }).bind(this));

 });
	  
  Portal.prototype.getClient=(function(){
    if(!__client)
         __client = new Client(this);
    return __client;
  })

  /**
   The function install the page when the page is navigated
  */
  Portal.prototype.onInstallPage=(function(idPage, clientWhatToChangePage){   
    var dialog = this.getLoadingDialog();
    var clientWhatToChangePage = clientWhatToChangePage?true:false;
     if(!__client){
        this.reload("No valid client found");
        return;
     }; 
  	 var renderPage = null;
     var cachPage  = __PAGE_CACHE[idPage]; 
     if(cachPage instanceof Component){
        renderPage = cachPage;
      }else{
       var route  = __router.getRoute(idPage);
         if(route){
           var renderPage  = new route.controller(this);
            renderPage.setClient(__client);
           __PAGE_CACHE[idPage] = renderPage;
         }
      }
    if(!renderPage){
      if(clientWhatToChangePage){
        this.render(dialog);
      }
      this.onInvalidPage(idPage);
    }else{
      //install the page 
      renderPage.setParent(this);  
      this.render(renderPage);
    }
  });

  Portal.prototype.canReload=(function()
  {
      return RELOAD_ATTEMPT < REQUIRE_RELOADING_ATTEMPT;
  });



 Portal.prototype.navigateTo =(function(path, params)
 {
   var client = this.getClient();
   var dialog  = this.getLoadingDialog();
   //update server page and change  reload the page portal
    client.onPageChange(path, params).then((function(pageId)
    { 
      __router = this.getRouter();
      __router.navigate(pageId);
       
    }).bind(this),
    (function(error){
        dialog.publish("<p class='error'> "+error+"<p>");
    }).bind(this));
   
 })

 /**
  The function reload the portal 
  */
   Portal.prototype.reload=(function()
   {
      var dialog = this.getLoadingDialog();     
      if(this.canReload()){
      	  if(!__reloadTimer)
      	  		__reloadTimer  = Timer.create("reloadPortal", 1000, 1);
      	  __reloadTimer.reset();
      	  __reloadTimer.start((function()
      	  {
      	      RELOAD_ATTEMPT++;
      	      dialog.status("Please portal about to reload, number of attempts ("+(RELOAD_ATTEMPT)+"/"+REQUIRE_RELOADING_ATTEMPT+")");
              this.onInitialize();
      	  }).bind(this));

      	this.clearAll();
    } 
   });


  Portal.prototype.onInvalidPage=(function(path)
  {
    var dialog = this.getLoadingDialog();
    this.render(dialog);
    dialog.publish("Request page is unable available");
    dialog.status(path+" no page found");

  });

  Portal.prototype.clearAll=(function()
  {
     this.render(this.getLoadingDialog());

  })

  Portal.prototype.getVersion=(function()
  {
    return VERSION;
  })

  Portal.prototype.isAttemptCompleted=(function()
  {
      return  RELOAD_ATTEMPT >= REQUIRE_RELOADING_ATTEMPT;
  });
  Portal.prototype.setClient =(function(client)
  {
  	if(client instanceof Client){
  		__client = client;
  	}
  })

 /**
     The method return true of the number of attempt to reload the application has be reached.
     @method
     @memberof Portal#
     @return {boolean} if the attempt reload is reach return true otherwise false.

  */
  Portal.prototype.getMaxReloadAttempt  =(function()
  {
    return REQUIRE_RELOADING_ATTEMPT;
  })


  /**
     The method return the attempt made to reload the portal engine
     @method
     @memberof Portal#
     @return {boolean} if the attempt reload is reach return true otherwise false.

  */
  Portal.prototype.getReloadAttempt  =(function()
  {
    return RELOAD_ATTEMPT;
  })


 /**
     Status to show if portal have to remove all the component and reload it from the server 
     @method
     @memberof Portal#
     @param {Boolean} abool_force tell the portal to reload from the server if true else reload from cache if available
     @return void 

  */

  Portal.prototype.reloadFromServer =(function()
  {
     return RELOAD_FROM_SERVER;
  })
   /**
     Return the current portal server  url
     @method
     @memberof Portal#
      @return {String}

  */

  Portal.prototype.getServerUrl=(function()
   {
      return this.serverURL;
  })
  Portal.prototype.getClientDir=(function()
  {
    return  PORTAL_CLIENTS_DIR;
  })

 /**
     Return the portal  object in a string format
     @method
     @memberof Portal#
      @return {String}

  */
  Portal.prototype.toString =(function()
  {
     return "[object Portal]";
  })



  Portal.prototype.onCreate=(function()
  {
  	Portal.superclass.onCreate.call(this);
  	var portalElement  = document.getElementById(__uuid);
  	this.set(portalElement);
    this.addClass("portal")
  	$(this.get()).height(parseInt($(document).height()));
  	$(this.get()).width(parseInt($(document).width()));
    this.setClient(new Client(this);    
  	__loadingDialog.onCreate(this.get());  

   

  })

  Portal.prototype.getLoadingDialog=(function()
  {
  	return __loadingDialog;
  });

  Portal.prototype.setRouter=(function(router)
  {
  	if(router instanceof Router)
  		__router = router;
  	return this;
  });



  Portal.prototype.renderUI=(function()
  {
  	var htmlDialog = __loadingDialog.renderUI();

     return(`
             <div id='${__uuid}' class='ui-portal-container'>
                 ${htmlDialog}
             </div>
     	`);
   
  })


  Portal.prototype.setRenderer=(function(renderer)
  {
     var isRenderer  =  (renderer instanceof Renderer);
     if(!isRenderer) 
        renderer = new Renderer(document.createElementByID("div"));
     __renderer = renderer;
     return this;   
  });

  Portal.prototype.getRouter=(function()
  {
     if(!__router)  __router = new Router(this);
     return __router;
  });

  Portal.prototype.start=(function()
  {  	
    if(__renderer){
    	 __renderer.render(this, (function()
    	 {
         var divApp = __renderer.get();
    	 if(divApp){
    	 	 divApp.setAttribute("id", "ui-application-"+UUID.v4());
    	 }
         this.onInitialize();
        }).bind(this));
    	
    }
  });
 Portal.prototype.render =(function(component,callback)
 { 
 	//caches
     if(component instanceof Component){
        if(!component.isAuthenticated()){
        	var authPage  = component.getAuthPage();
        }
        if(authPage instanceof Component){
        	component = authPage;
        }
        if(__PREVIEW_PAGE){
        	__PREVIEW_PAGE.dispose();
        	__PREVIEW_PAGE= component;
        }
     	__renderer.renderWith(component,this.get(), (function()
     	{   
        if(typeof callback =='function')
           callback();
     		
     	}));
     }
 });
module.exports =Portal;

