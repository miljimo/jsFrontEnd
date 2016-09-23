
"use strict"
var Component = require("./component.js");

var isSettingOpen  =  false;
var advanceSearchSettingsCom = null;
var SearchPanel  = Component.extends((function(parent)
{
	SearchPanel.superclass.constructor.call(this,parent);
	advanceSearchSettingsCom = new AdvanceSearchSettings(this);

}))


SearchPanel.prototype.onCreate=(function(parentDiv)
{
  SearchPanel.superclass.onCreate.call(this);
  var myDiv = document.getElementById("ui-search-panel-id");
  this.set(myDiv);
  advanceSearchSettingsCom.onCreate(myDiv);
  var pnlButtonsSettings   	= document.getElementById("ui-search-panel-buttons-id");
  var btnSettings          	= document.getElementById("ui-btn-search-panel-settings"); 
  var txtSearch     		= document.getElementById("ui-search-panel-view-id");
  var result        		= document.getElementById("ui-search-panel-results-id");


  
  this.on(txtSearch,["keyup","change"],(function()
  {
  	 var text = txtSearch.value;
  	 advanceSearchSettingsCom.closeSettingsWindow();
  	 if(text!=""){
  	 	 this.removeClass(result, "hide-component");
    	 this.addClass(result, "show-component");
  	 }
     else {
     	this.removeClass(result, "show-component");
     	this.addClass(result, "hide-component");
      }
  	 
  	 this.onTextChange(text);
  }).bind(this));

//on focus 
   this.on(txtSearch,["focus"],(function()
   {
   	this.removeClass(pnlButtonsSettings,"hide-component");
  	this.addClass(pnlButtonsSettings,"show-component");
   }).bind(this))

//on focusout
   this.on(txtSearch,["dblclick"],(function()
   {
   	this.removeClass(pnlButtonsSettings,"show-component");
  	this.addClass(pnlButtonsSettings,"hide-component");
   }).bind(this))


  this.on(btnSettings, "click", (function()
  {
  	this.removeClass(result, "show-component");
    this.addClass(result, "hide-component");
  	advanceSearchSettingsCom.toggleSettingsWindow();
  	
  }).bind(this));
});



SearchPanel.prototype.onTextChange=(function(text)
{
	var results  = document.getElementById("ui-search-result-header-id");
	results.innerHTML="Search : "+ text;
	if(this.onTextChangeTrigger){
		this.onTextChangeTrigger(text);
	}
})


SearchPanel.prototype.updateUI=(function()
{
   var searchValue  = this.getParameter("search");
   if(searchValue){
    var txtSearch  = document.getElementById("ui-search-panel-view-id");
    txtSearch.setAttribute("value", searchValue);
   }
 
})





SearchPanel.prototype.styles=(function(){
	var style = SearchPanel.superclass.styles.call(this);
	style.apply("css/search_panel.css");
	return style;
})
SearchPanel.prototype.renderUI=(function()
{
  
    var advanceSettingsHTML = advanceSearchSettingsCom.renderUI();
	return (`
            <div id='ui-search-panel-id' class='ui-component ui-search-panel'>

              <div class='ui-search-panel-control'>
                <input type='search' id='ui-search-panel-view-id' placeholder='Type your search here e.g rooms, hostel, hotel, bookings e.t.c...'/>
                <input type='button'  value='Search >>' />               
              </div>

               ${advanceSettingsHTML}
               <div id='ui-search-panel-results-id' class='ui-search-panel-results'>
                 <div id='ui-search-result-header-id' class='ui-search-result-header'></div>
                 <div id='ui-search-result-content-id' class='ui-search-result-content'>

                    No result found...
                 </div>

               </div>

              <div id='ui-search-panel-buttons-id' class ='ui-search-panel-buttons' >
                <div id='ui-search-settings-control-ui-settings-id' class='ui-search-settings-control ui-arrow-down'>
                  <input type='button' class='ui-btn-settings' value='settings'  id='ui-btn-search-panel-settings' >  
                </div> 
              </div>

            </div>
		`)
})



var TabButton =Component.extends((function(p)
{
	TabButton.superclass.constructor.call(this, p);
}))

TabButton.prototype.onCreate=(function()
{

})

/**
 Create an advance settings component
*/


var AdvanceSearchSettings = Component.extends((function(p)
{
  AdvanceSearchSettings.superclass.constructor.call(this, p);

}))


AdvanceSearchSettings.prototype.onCreate=(function()
{
	var formSettings  = document.getElementById("ui-search-panel-settings-id");
	this.set(formSettings);	
	this.addClass("hide-component")
})


AdvanceSearchSettings.prototype.toggleSettingsWindow=(function()
{
   if(!isSettingOpen){
     this.openSettingsWindow();
     return;
   }
   this.closeSettingsWindow();
})




AdvanceSearchSettings.prototype.openSettingsWindow=(function()
{
var formSettings  = this.get();
this.removeClass(formSettings,"hide-component");
this.addClass(formSettings,"show-component");
isSettingOpen  =true;
})


AdvanceSearchSettings.prototype.closeSettingsWindow=(function()
{
 var formSettings  = this.get();		 
 this.removeClass(formSettings,"show-component"); 
 this.addClass(formSettings,"hide-component");
 isSettingOpen  =false;
})





AdvanceSearchSettings.prototype.renderUI=(function()
{
	var currentSymbol = "NGN";
	return (`
		    <div id= 'ui-search-panel-settings-id' class='ui-search-panel-settings'>

                <div class='ui-search-settings-header'>
                 Advance search
                </div>

                <div class='ui-search-settings-content'>

	                <div class='ui-search-settings-control'>
	               		 <label>Location</label><input type='text' placeholder='location e.g oleh'/>
	                </div>

	                <div class='ui-search-settings-control'>
	               		 <label>Miles</label><input type='text' placeholder='location e.g oleh'/>
	                </div>

	                <div class='ui-search-settings-control'>
	               		 <label>Apartment type</label>
	               		 <select class='select'>
	               		  <option>select ...</option>
	               		 </select>
	                </div>

	                <div class='ui-search-settings-control'>
	               		 <span> <label>Min. Price (${currentSymbol})</label><input type='number' placeholder='e.g 20000'/></span>
	               		 <span> <label>Max. Price (${currentSymbol})</label><input type='number' placeholder='e.g 200000'/></span>
	                </div>


	                 <div class='ui-search-settings-control'>
	               		 <span><input type='checkbox'/> use location</span>
	               		 <span><input type='checkbox'/> only items with image</span>
	                </div>

	                 <div class='ui-search-settings-control'>
	               		 <input type='button'  value='Update Search'/>
	                </div>

            </div>
        </div>
              
     `);

})


module.exports = SearchPanel;