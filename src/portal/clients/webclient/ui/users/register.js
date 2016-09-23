/**
 The file contain the module component to register the user
  @file  RegisterDialog.js
  @author Obaro

*/
"use strict"
var FormDialog = require("../formdialog.js");
var uuid       = require("node-uuid");
var $          = require("jquery");
var TextBox    = require("../lineedit.js");
var Button     = require("../button.js");
var store      = require("../../utils/LocalStorage.js");
var DataModel  =require("../../services/user/registeruserservice.js");
var userValidator  = require("./user_validator.js");


require("../../css/user_register_dialog.css");

var  RegisterDialog = Object.extends(FormDialog, function(parent)
{
   RegisterDialog.superclass.constructor.call(this, parent); 
   this.txtSurname    = new TextBox(this,"Surname");
   this.txtFirstname  = new TextBox(this,"Firstname");
   this.txtEmail      = new TextBox(this,"Email");
   this.txtUsername   = new TextBox(this,"Username");
   this.txtPassword   = new TextBox(this,true);
   this.txtCPassword  = new TextBox(this,true);
   this.btnCreate     = new Button(this, "Create");
   this.setModal(new DataModel(this));
   Object.defineProperties(this, {"validator":{writable:false, enumerable:false, value:userValidator}});

});

RegisterDialog.prototype.setModal=(function(model){
  if(model){
     Object.defineProperties(this, {"model":{writable:false, enumerable:false, value:model}});
  }

})

RegisterDialog.prototype.setUI=(function()
{  
  RegisterDialog.superclass.setUI.call(this);
	var contentUI  = this.getContentDiv();
	var footerUI   = this.getFooterDiv();
	if(contentUI){
		  this.addComponent(contentUI, this.txtSurname);
		  this.addComponent(contentUI, this.txtFirstname);
		  this.addComponent(contentUI, this.txtEmail);
		  this.addComponent(contentUI, this.txtUsername);
		  this.addComponent(contentUI, this.txtPassword);
		  this.addComponent(contentUI, this.txtCPassword);	
		  this.addComponent(footerUI,  this.btnCreate);	
         
	}
});
RegisterDialog.prototype.onViewCreated=(function(parent){
  RegisterDialog.superclass.onViewCreated.call(this,parent);
   this.txtCPassword.setLabel("Confirm Password"); 
  this.addClass("ui-user-register-dialog");
  this.retainSessionObject();
  this.handleEvent();
})

RegisterDialog.prototype.handleEvent=(function()
{
  //button events
   this.btnCreate.onClick=(function(button, x, y){
     var info  = this.getDetails();
     if(this.validate(info)){
      this.clearError();
      this.disableForm(true);
      if(this.model){
          this.btnCreate.setText("submitting...");
          this.btnCreate.enableLoading(false);
          this.model.setData(info);
          this.handleRequest();         
         
        }//end modal exists
     }
   }).bind(this);

   //ontextChnage events
  this.txtUsername.on(["textchange"], (function(event)
  {
     this.validate(this.getDetails(), true);
  }).bind(this));
  //handle password change events
   this.txtPassword.on(["textchange"], (function(event)
  {
     this.validate(this.getDetails(), true);
  }).bind(this));
   //handle change events
  this.txtEmail.on(["textchange"], (function(event)
  {
     this.validate(this.getDetails(), true);
  }).bind(this));

 this.txtCPassword.on(["textchange"], (function(event)
  {
    this.validate(this.getDetails(), true);
  }).bind(this));
 this.txtSurname.on(["textchange"], (function(event)
  {
   this.validate(this.getDetails(), true);
  }).bind(this));
 this.txtFirstname.on(["textchange"], (function(event)
  {
     this.validate(this.getDetails(), true);
  }).bind(this));

});

/**
 Handle Request , on server side of the application with the give url
*/
RegisterDialog.prototype.handleRequest=(function()
{
  if(this.inProgress)return;
  this.inProgress =true;
  this.model.execute(this.getClient().portal.getServerUrl(), this.response.bind(this));
})

RegisterDialog.prototype.response=(function(status, data){

    if(!status){
        this.setError(data.error);
        this.inProgress=false;
        this.disableForm(false);
        this.btnCreate.setText("Create");
        return ; 
    }   
    this.autoLogin(data.user.uid, this.getDetails().password);
 //process success  when the form has be registered
});


RegisterDialog.prototype.autoLogin=(function(uuid, password)
{
     var client = this.getClient();
     if(client){
          client.userId(uuid);
          client.changePageTo("account?uid="+uuid);
     }
});


RegisterDialog.prototype.validate=(function(info, autoTyping)
{ 
  var isValid=false;
  if(this.validator){  
    store.setSessionObject("cuser",info);
    this.centerContentOn(this.get());
    isValid =  this.validator.valid(info);
    if(!isValid){
      var ptags ="";
       this.validator.errors(function(field, error){
            ptags+="<p  class='error' type='"+field+"'>"+error +"</p>";
       });
      this.setError(ptags);
    }else{
      if(info.password !=info.cpassword){
         this.setError("Your password(s) did not matched");
         isValid=false;
      }else{
         this.clearError();
      }
    }
  };
  return isValid;
});


RegisterDialog.prototype.setError=(function(error)
{
  if(typeof error =='string'){
      var errorUI = this.getMessageDiv();
      if(errorUI){
          this.addClass(errorUI,"error");
          errorUI.innerHTML = error;
      }
  }
});


RegisterDialog.prototype.clearError=(function()
{
   var errorUI = this.getMessageDiv();
   if(errorUI){
      this.removeClass(errorUI,"error");
      errorUI.innerHTML = "";
  }
});


RegisterDialog.prototype.disableForm=(function(abool){
  
  var isDiable  = (abool)?true:false;
  this.btnCreate.enable(!isDiable);
  this.txtUsername.enable(!isDiable);
  this.txtPassword.enable(!isDiable);
  this.txtEmail.enable(!isDiable);
  this.txtFirstname.enable(!isDiable);
  this.txtCPassword.enable(!isDiable);
  this.txtSurname.enable(!isDiable);
})


RegisterDialog.prototype.collapseForm=(function(state, callback){
  var state = state?state:false;
  var content = this.getContentDiv();
  var footer  = this.getFooterDiv();
    if(state){
      $(content).fadeOut("slow", callback);
      $(footer).hide();
    }else{
      $(content).fadeIn("slow", callback );
      $(footer).fadeIn();
    }
})

RegisterDialog.prototype.retainSessionObject=(function()
{
 var user  = store.getSessionObject("cuser") || null;
 if(user){
   this.txtSurname.setText(user.surname);
   this.txtFirstname.setText(user.firstname);
   this.txtEmail.setText(user.email);
   this.txtPassword.setText(user.password);
   this.txtUsername.setText(user.username);
};

})
/**
 The function return user information from the registration form
*/
RegisterDialog.prototype.getDetails=(function()
{
   var txtUsername  = this.txtUsername.getText();
   var txtPassword  = this.txtPassword.getText();
   var txtEmail     = this.txtEmail.getText();
   var txtFirstname = this.txtFirstname.getText();
   var txtLastname  = this.txtSurname.getText();
   var txtCPassword  =this.txtCPassword.getText();
  var info =  {
     "surname":txtLastname,
     "firstname":txtFirstname,    
     "email":txtEmail,
     "username":txtUsername,
     "password":txtPassword,
     "cpassword":txtCPassword
    }
 return info;
})

/**
 The function is called when its on a mobile view
*/
RegisterDialog.prototype.onMobileView=(function(abool){
    this.getContainerDiv().style.position="absolute";
    var h = $(this.get()).height()* 0.90;
    var w = $(this.get()).width()* 0.95;
    var pos = $(this.get()).position();
    $(this.getContainerDiv()).height(h);
    $(this.getContainerDiv()).width(w);
    $(this.getContainerDiv()).css({left:pos.left+"px", top:pos.top+"px"});
    this.centerContentOn(this.get());    
  
})




module.exports = RegisterDialog;

