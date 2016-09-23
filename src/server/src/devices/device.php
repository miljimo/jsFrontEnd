<?php

/**
Get current devices of the portal user agent information
*/
namespace portal\devices;
use  portal\http\Request;
use  Sinergi\BrowserDetector\Browser  as SinergiBrowser;
use  Sinergi\BrowserDetector\Device   as SinergiDevice;
use  Sinergi\BrowserDetector\OS       as SinergiOS;
use  Sinergi\BrowserDetector\Language as SinergiLanguage;
use  portal\services\SupportDeviceService;
use  portal\registries\ServiceRegistry as Registry;
use  portal\http\Response;
use  portal\Logger;

class  Device {

private $ipAddress      = "";
private $broswerVersion = "";
private $osName         = "";
private $broswer        = "";
private $userAgent      = "";
private $isMobile       = "";
private $osVersion      = "";
private $request        = "";
private $language       = "";
private $hostName       = "";
private $supportService=null;
private $logger =null;
private static $instance =null;

/*
  The funnction construct get the request object and used it to load current 
*/

 protected function __construct(Request $request=null){
 	 $this->logger= new Logger();
 	//set the devices information
 	 $this->supportService = new SupportDeviceService($request, null);
	 $this->request        = $request;
	 $browser              = new SinergiBrowser();
	 $language             = new SinergiLanguage();
	 $device               = new SinergiDevice();
	 $os                   = new SinergiOS();
	 if(!$this->request)
	 	 $this->request    = new Request();
	 $this->ipAddress      = $this->request->server->get("REMOTE_ADDR");
	 $this->hostName       = $this->request->server->get("REMOTE_HOST");
	 $this->broswerVersion = $browser->getVersion();
	 $this->broswer        = $browser->getName();
	 $this->userAgent      = $browser->getUserAgent();
	 $this->language       = $language->getLanguage();

	 $this->osVersion      = $os->getVersion();
	 $this->os             = $os->getName();
	 $this->isMobile       = $os->isMobile();
	 $this->device         = $device->getName();
 }

/**
 Get the instanceof of the current device informations
*/
public static function getInstance(Request $request =null){
	if(self::$instance==null){
		self::$instance = new Device(($request)?$request:(Request::createFromGlobals()));
	}
	return self::$instance;
}


 public function  getOsVersion(){
 	 return $this->osVersion;
 }

 /**
   Get the broswer or devices name 
 */
 public function  getName(){
   $name = $this->broswer;
 	if(isset($this->device) && !empty( $this->device)){
 		$name .=",".$this->device;
 	}
   return $name;
 }
 public function  getOs(){return $this->os;}
 public function  getBrowser(){return $this->broswer;}
 public function  getBrowserVersion(){return $this->broswerVersion;}
 public function  getUserAgent(){return $this->userAgent;}
 public function  isMobileBroswer(){return $this->isMobile;}
 public function  getIPAddress(){return $this->ipAddress;}
 public function  getHostName(){return $this->hostName;}
 public function  getLauguage(){return $this->language;}
 public function  getDevice(){return $this->device;}
 public function isSupported(){

	$name    = $this->getBrowser();
	$version = $this->getBrowserVersion();
	$this->supportService->setVersion($version);
	$this->supportService->setType($name);
	return  $this->supportService->execute();
}

/**
 The function get the information of the type of client that the current portal client engine support 
*/
public function getInfo(){
    return array(
    	"clientFolder"=>$this->supportService->getName(),
    	"clientScript"=>$this->supportService->getScriptUrl(),
    	"clientTypes"=>$this->supportService->getTypes(),
    	"status"=>$this->supportService->getStatus(),
    	"clientDefaultPage"=>$this->supportService->getDefaultPage()
    );
}




/**

  The function execute all the portal services that is called by the client
*/

public function execute(Request $request , Response $response)
{
  $service  =  Registry::getService("service",$request,  $response);
  if($service){
  	    $this->logger->getLogger()->addInfo("Service [".$request->get("service")."] has be executed successfully",[]);
	 	$response =  $service->execute();
	 
	 	if(is_a($response, Response::class)){
	 			
	 		if(preg_match("/internet/i", $this->getName())){
	 			//internet explorer out plaintext
	 		    $response->headers->set('Content-Type', 'text/plain');
	 		}
	   	}
	}
	return $response;
}

}






