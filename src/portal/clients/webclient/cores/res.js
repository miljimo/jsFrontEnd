
var __execute =(function(url, resolve, reject){
 try{
   init.bind(this)(resolve, reject);
   if(this.__request){
          //An abstract request object that the user can used to added the fields 
          
           var request ={
              "header": header.bind(this),
              "field" : (function(name, value){

                if(typeof name ==='string')
                  this.__fields[name] = (value)?value:(this.__fields[name])?this.__fields[name]:null;
                return this.__fields[name];

              }).bind(this), 
              "method":(function(value){
                if(typeof value !=='string') return this.__method;
                this.__method = value;
              }).bind(this),

              "open": (function(url){
                this.__url = (typeof url ==='string')?url:this.__url;
                return this.__url;
              }).bind(this),

              "send":(function(){
               sendRequest.apply(this);
              }).bind(this)
           };
           request.toString=(function(){return "[object Request]"});
           this.doInbackground.call(this,request, url);
         }
     }catch(error){
       reject(error);
     }
});