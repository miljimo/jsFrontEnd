
  var Component = require("../component.js");
  var UUID      = require("node-uuid");


  var AccountPage =Component.extends(function(parent){
   AccountPage.superclass.constructor.call(this, parent);
   Object.defineProperties(this, {"__uuid_account":{value:"_uuid_account"+UUID.v4(), writable:false, enumerable:false}});

   });



  AccountPage.prototype.renderUI=(function()
  {
  	var uuid_account = this.__uuid_account;

     return (`

              <div id='${uuid_account}'>
               		Your account, loading....
              </div>


     	`)

  });




  module.exports =AccountPage;