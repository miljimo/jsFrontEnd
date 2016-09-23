
"use strict"

var FormDialog  = require("../formdialog.js");
var Button      = require("../button.js");
var TextBox     = require("../lineedit.js");
var CheckBox    = require("../checkbox.js");
var Service     = require("../../services/user/userauthenticationservice.js");
var userValidator  = require("./user_validator.js");
var $           = require("jquery");
var store       = require("../../utils/LocalStorage.js");
require("../../css/login_dialog.css");




var LoginDialog  =Object.extends(FormDialog,(function(parent)
{
    LoginDialog.superclass.constructor.call(this,parent);
    Object.defineProperties(this,{"validator":{"value":userValidator, writable:false, enumerable:false}}); 
    Object.defineProperties(this,{"model":{"value":new Service(), writable:false, enumerable:false}}); 
    this.txtUsername          = new TextBox(this, "Username");
    this.txtPassword          = new TextBox(this, true);
    this.chkOption            = new CheckBox(this, "Keep me logged in.");
    this.btnLogin             = new Button(this, "Log In");
    this.btnForgetPassword    = new Button(this, "Forget Password or Username?");


}));

/**
Override the setUI component function
*/

LoginDialog.prototype.setUI=(function()
{
   LoginDialog.superclass.setUI.call(this);
   this.setMessage("Members only.");
   this.title = "Client Login Panel";
   this.subtitle ="";  
   this.addComponent(this.getContentDiv(), this.txtUsername);
   this.addComponent(this.getContentDiv(), this.txtPassword);
   this.addComponent(this.getContentDiv(), this.chkOption);
   this.addComponent(this.getFooterDiv(), this.btnLogin);
   this.addComponent(this.getFooterDiv(), this.btnForgetPassword);
   this.setTitle(this.title);
   this.getMessageDiv().innerHTML=this.subtitle;


})


LoginDialog.prototype.onViewCreated =(function()
{
	LoginDialog.superclass.onViewCreated.call(this);
  this.addClass("user-login-ui");
	this.btnForgetPassword.addClass("ui-pack");
	this.btnForgetPassword.addClass("ui-right");
	this.btnForgetPassword.addClass("ui-transparent");
	this.btnForgetPassword.hideIcon(true);
  var info = store.getSessionObject("cuser");
  if(info){
  this.txtUsername.setText(info.username);
  this.txtPassword.setText(info.password);
  alert(this.getToolbar())
}
	this.handleEvent();
})


/**
 Handle login super events
*/

LoginDialog.prototype.handleEvent=(function()
{
   this.btnLogin.onClick=(function(button, x, y){
      var info = this.getDetails();
      this.onSubmit(info);
   }).bind(this);


   this.txtPassword.on(["textchange"],(function(){
      this.validate(this.getDetails());
   }).bind(this));
   this.txtUsername.on(["textchange"],(function(){
      this.validate(this.getDetails());
   }).bind(this))

});

LoginDialog.prototype.onSubmit =(function(info){

  if(this.inProgress)return;

  if($.isPlainObject(info)){
      if(this.validate(info)){
          this.disableForm(true);
          this.inProgress = true;
          this.model.info(info);
          this.model.execute(this.getClient().portal.getServerUrl(), this.response.bind(this));
      }
  }

})


LoginDialog.prototype.response=(function(status, data)
{
   if(!status){
      this.inProgress=false;
      this.disableForm(false);
      this.showError(data.error);
      return this;
   }
   var info  = this.getDetails();
   if(info.saveDetails){
       store.setSessionObject("autoUser", data.user);
   }
   this.getClient().userId(data.user.uid);
   store.removeSessionObject("cuser");
   this.getClient().changePageTo("account?user=somone");
});


LoginDialog.prototype.showError=(function(strErrors){
   this.addClass(this.getMessageDiv(), "error");
   this.setMessage(strErrors);
})


LoginDialog.prototype.disableForm=(function(status){
     this.txtPassword.enable(!status);  
     this.txtUsername.enable(!status);
     this.btnLogin.setText("Please wait...");
     this.btnLogin.addClass("ui-pack");
     this.btnLogin.enableLoading(status);
     this.btnForgetPassword.enableLoading(status);
     this.btnForgetPassword.enable(!status);
     this.__inProgress=status;
})


LoginDialog.prototype.getDetails  =(function(){
  var info ={};
  var username = this.txtUsername.getText();
  var password = this.txtPassword.getText();
  var isSaveDetails  =this.chkOption.isChecked();
  info.password = password;
  info.username = username;
  info.saveDetails= isSaveDetails;
  return info;
});

LoginDialog.prototype.validate =(function(info){

  var isValid =false;
   if($.isPlainObject(info)){
      var status = this.validator.valid(info);
      if(!status){
        var html= "";
          this.validator.errors((function(field, error){
             html +="<p class='error'>"+error+"</p>";
          }).bind(this));
          this.showError(html);
      }else{
          this.clearErrorMessage();
      }

      isValid = status;

   }

   return isValid;
});


//function hide the error message div
LoginDialog.prototype.clearErrorMessage=(function()
{
   var erroMesDiv = this.getMessageDiv();
   erroMesDiv.innerHTML= this.subtitle;
   this.removeClass(erroMesDiv, "error");
});



module.exports = LoginDialog;