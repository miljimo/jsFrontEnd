"use strict"

var Component = require("./component.js");
var LoginDialog    = require("./users/login.js");
var SearchView     = require("./searchpanel.js")
var uuid           = require("node-uuid");
var $              = require("jquery");

require("../css/index_page.css");


/**
 The indexpage class component
 @class
*/
var IndexPage  = Component.extends(function(){
	IndexPage.superclass.constructor.call(this);
  //generated uuid
  Object.defineProperties(this, {"_uuid_index_page":{value:("index_page"+uuid.v4()), writable:false, enumerable:false}});
   Object.defineProperties(this, {"_uid_header":{value:("_uid_header"+uuid.v4()), writable:false, enumerable:false}});
   Object.defineProperties(this, {"_uid_content":{value:("_uid_content"+uuid.v4()), writable:false, enumerable:false}});
   Object.defineProperties(this, {"_uid_footer":{value:("_uid_footer"+uuid.v4()), writable:false, enumerable:false}});
 
   this.loginDialog     = new LoginDialog(this);
   this.seearchView     = new SearchView(this);


});
IndexPage.prototype.onViewCreated=(function()
{
 IndexPage.superclass.onViewCreated.call(this);
 
});


IndexPage.prototype.setUI=(function()
{
    var mainDiv = document.getElementById(this._uuid_index_page);
    this.set(mainDiv);
    this.addComponent(this.getContentDiv(), this.loginDialog);


});

IndexPage.prototype.getHeaderDiv =(function()
{
  return document.getElementById(this._uid_header);
})

IndexPage.prototype.getContentDiv =(function()
{
  return document.getElementById(this._uid_content);
})

IndexPage.prototype.getFooterDiv =(function()
{
  return document.getElementById(this._uid_footer);
})


IndexPage.prototype.renderUI=(function()
{
  var __uuid_index_page            =this._uuid_index_page;
  var __uid_index_page_header      = this._uid_header;
  var __uid_index_page_content     =this._uid_content;
  var __uid_index_page_footer      =this._uid_footer;

   return (`
            <div id='${__uuid_index_page}' class='ui-index-page'>
              <div class ='w3-card-2 ui-index-header' id='${__uid_index_page_header}'>
               header
              </div>

              <div class ='ui-index-content ' id='${__uid_index_page_content}'>
              </div>

              <div class ='ui-index-footer' id='${__uid_index_page_footer}'>
              </div>
             
            </div>
     `);
});


module.exports =IndexPage;

