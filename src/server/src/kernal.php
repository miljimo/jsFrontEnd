<?php
/**
 The kernal will load a services if its supported for the particular platform
 and load the current client for that services 

*/
namespace portal;
use portal\http\Request;
use portal\http\Response;
use portal\devices\Device;
use portal\services\RegisterDeviceService;
use portal\services\SessionCheckPageService as SessionPageService;
use portal\Logger as KernalLogger;
use portal\helpers\Session;
  


 class Kernal{

   private static $instance=null;
     private $request;
     private $response;
     private $device;
     private static $logger =null;
     private $supported =false;

/**
  The kernal constructor and its protected 
  @param {Request}request client sent request object
*/
protected function __construct(Request $request=null)
    {
      Kernal::$logger = new  KernalLogger();    
      $this->request = $request;
      if($this->request == null) 
          $this->request = new Request();
      $this->response    = new Response();      
      $this->device      = Device::getInstance($this->request);
      $this->response->addParameter("status", false);
      $this->response->addParameter("os",$this->device->getOs());
      $this->response->addParameter("browser", $this->device->getBrowser());
      $this->response->addParameter("generic", $this->device->getName());
      $this->response->addParameter("ipAddress", $this->device->getIPAddress());
      $this->response->addParameter("hostname", $this->device->getHostName());
      $this->response->addParameter("lauguage", $this->device->getLauguage());
      $this->response->addParameter("service", $this->request->get("service"));
      $this->response->addParameter("version", $this->device->getBrowserVersion());
      $this->response->addParameter("isMobile", $this->device->isMobileBroswer());
      $this->response->addParameter("supported", false);
      //check if the devices is supported or not   
      $this->checkDeviceIfSupported();
    }


    private function checkDeviceIfSupported(){
      if($this->device->isSupported()){
        $this->supported= true;
        $supportSoftware = $this->device->getInfo();       
       // $this->response->addParameter("clientScript",$supportSoftware["clientScript"]);
       //$this->response->addParameter("clientFolder",$supportSoftware["clientFolder"]);
       // $this->response->addParameter("clientTypes",$supportSoftware["clientTypes"]);
        $this->response->addParameter("status", $this->supported);   
        $this->response->addParameter("clientDefaultPage", $supportSoftware["clientDefaultPage"]); 
      }else{
           $broswer= $this->device->getBrowser();
           $appDevice= $this->device->getDevice();
           $os =$this->device->getOs();
           $this->supported=false;
           $this->response->addParameter("status",false);
           $this->response->addParameter("error", " Unfortunately your $os $appDevice device or $broswer browser is not currently supported , please contact our support team for more details.");
      }
    }

    /**
     The kernal will try and get the matched devices that can support this devices 
     and asked it to load its clients informations 

    */

    private function getResponse(){
      if($this->device  && $this->supported){         
          $sessionPageService = new SessionPageService($this->request,$this->response);          
          $sessionId = Session::getId();
          $supportSoftware = $this->device->getInfo(); 
          $this->response->addParameter("clientSessionId",$sessionId);
          $sessionPageService->setSessionId($sessionId);
          $sessionPageService->setClientIpAddress($this->device->getIPAddress());
          $this->response = $sessionPageService->execute();                
          if($this->response){            
            $this->request->query->set("ipAddress", $this->device->getIPAddress());
            $response = $this->device->execute($this->request, $this->response);             
            if($response !=null){
              $this->response  = $response;
            }
          }
      }
      return $this->response;
    }

    protected function getInstance(){
       if(self::$instance==null)
            self::$instance = new Kernal();
        return self::$instance;
    }

    /**
     Add a supported devices with the client script to run
    */

    public static function registerDevice(array $name){

       if(is_array($name)){
       $device      =(isset($name["name"]))?addslashes($name["name"]):"";
       $script      =(isset($name["clientTypes"]))? (pathinfo($name["clientScript"])["filename"]):"";
       $types       =(isset($name["clientTypes"]))?$name["clientTypes"]:""; 
       $minVersion  =(isset($name["maxVersion"]))?addslashes($name["maxVersion"]):""; 
       $maxVersion  =(isset($name["maxVersion"]))?addslashes($name["name"]):""; 
       $defaultPage =(isset($name["defaultPage"]))? (pathinfo($name["defaultPage"])["filename"]):"IndexPage";
     //set the kernel registration
       $registerDeviceService= new RegisterDeviceService();
       $registerDeviceService->setDevice($device);
       $registerDeviceService->setScript($script);
       $registerDeviceService->setTypes($types);
       $registerDeviceService->setMaxVersion($minVersion);
       $registerDeviceService->setMinVersion($minVersion);
       $registerDeviceService->setDefaultPage($defaultPage);

       if(empty($device)) return false;
       if(empty($script)) return false;
       return $registerDeviceService->execute();
     }
    }


   /**
     Remove the register devices to support.
   */
    public static  function unRegisterDevice($name){
      return $this->registerDeviceService.remove($name);
    }

    public static function getRequest(){
       $instance  = self::getInstance();
      return $instance->request;
    }

    function execute(){
      $this->response = $this->getResponse(); 
      return $this->response;
    }
     /**
       Capture the current request 
     */
   static function   capture(Request $request=null){
       if(self::$instance ==null)
           self::$instance = new Kernal($request);            
       return self::$instance;
   }
   /**
      The function terminate the request object after being used by the framework kernel
   */
   static function   terminate($request, $response){
     $request  = null;
     $response = null;

   }
     



 }