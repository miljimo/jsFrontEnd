<?php
  namespace portal\registries;
  use portal\registries\Registry as IRegistry;
  use portal\services\Service as IService;
  //use Symfony\Component\HttpFoundation\ParameterBag as SynfonyKeyValueBag;
  use portal\http\Request;
  use portal\http\Response;
  use portal\helpers\Helper as Matcher;
  use portal\tasks\RegisterServiceTask;
  use portal\tasks\CheckServiceTask;
  use portal\tasks\GetServiceTask;

  class ServiceRegistry implements IRegistry
  {
     private   $request         = null;
     private static $instance   = null;
     private  $logger           = null;
     private  $response         = null;
     private  $checkService         = null;
     private  $createService        = null;
     private  $getService           =null;

     protected function __construct(Request $request=null, Response $response=null){
     $this->request   = $request;
     $this->logger    = null;
     $this->response  = ($response)?$response:new Response();
     $this->checkService   = new CheckServiceTask();
     $this->createService= new RegisterServiceTask();
     $this->getService  = new GetServiceTask();

     }
     /*
         The function get the object with the given name from the register if exists
         @method 
         @param {string}$name the name of the register object used to added
         @param {mixtype} $default  the value to return if the object $name is not found.
       */
       public function get($name, $default=null)
       {
	       	$servicename       = null;
	       	$serviceObject = null;
          $isget =false;
          $servicename  = $this->request->get($name,"");
          
          $this->getService->setName($servicename);
          if($this->getService->get()){
            if(class_exists($this->getService->getModule())){
              $serviceClass = $this->getService->getModule();
              $serviceObject = new $serviceClass($this->request, $this->response);
              $isget = true;
            };
          }
            //unable to get services
          if(!$isget){
               $serviceObject = new \portal\services\ErrorService($this->response);
               $this->response->addParameter("status",false);
               $this->response->addParameter("error","The requested service $servicename was not found"); 
           }
	        return  $serviceObject;
      
     }
        /*
         The function register with the given name and value
         @method 
         @param {string}$name the name of the object to registered
         @param {mixtype} $value  the value of the object to register or map to the name
       */

       public function register($name, $value){

           if(Matcher::isWord($name))
           {  
            $this->checkService->setName($name);
            if(!$this->checkService->exists()){
              //create the services 
               $this->createService->setName($name);
               $this->createService->setModule($value);
               if(!$this->createService->create())
               {
                $this->response->addParameter("status", false);
                $this->response->addParameter("error", "Unable to register the given service [$name] ");
               }
            }
           }
       }
        /*
         The function return the number of register object found
         @method 
         @return {integer}
       */
       public function getCount(){

       }
        /*
        The function remove the object with the give name
         @method 
         @return {boolean} if success it return true else false;
       */
       public function remove($name){

       }

    public static function create(Request $request=null, Response $response=null){
     	if(self::$instance ==null)
     		 self::$instance = new ServiceRegistry($request, $response);
      if(self::$instance->response==null)
         self::$instance->response  = $response;
       if(self::$instance->request  == null)
         self::$instance->request  = $request;
     	return self::$instance;
    }

    //Get the current services
    public  static function getService($name, Request $request, Response $response){
        $registry =  ServiceRegistry::create($request, $response);
        $serviceObject  = $registry->get($name); 
        return $serviceObject;
       }
    
    public static function addService($name, $servicename)
       {
          if(is_string($name) &&  is_string($servicename)){
             if(class_exists($servicename)){
                  $registry = self::create(null,null);
               $registry->register($name, $servicename);
            }
          }
       }
  }

