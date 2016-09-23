var ComponentEvent = (function(name){
    if(typeof name ==='string')
    	  create.bind(this)(name); 
 
});

ComponentEvent.prototype["emit"]=(function(el, type){
  if(el){
	if(el.dispatchEvent)
	{
		el.dispatchEvent(this.get());
	}else if(el.fireEvent && type){
	   el.fireEvent("on"+ type,this.get());
	}
 }
});

ComponentEvent.prototype.get=(function(){
	return this._evt;
})

ComponentEvent.toString=(function(){
 	return "[class ComponentEvent]";
 })
ComponentEvent.prototype.toString=(function(){
 	return "[object ComponentEvent]";
 })


 //private method
var create=(function(name){
  	if(typeof name !='string') return ;
	   var event=null;
       if(window.Event){
        try{
            var event = new window.Event(name);
          }catch(err){
            //from IE 9 down
            event = document.createEvent("Event");
            event.initEvent(name, true,true);
          }
          }
        else{
            //from IE 9 down
            event = document.createEvent("Event");
            event.initEvent(name, true,true);
        }
    if(event){
    	Object.defineProperties(this, {"_evt":{value:event, writable:false, enumerable:false}})
    }
});



module.exports = ComponentEvent