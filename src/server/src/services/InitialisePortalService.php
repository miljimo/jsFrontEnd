<?php
/**
The initialiser will check if the current portal client has be supported 

*/
  namespace portal\services;
  use portal\services\Service;
  use portal\http\Request;
  use portal\http\Response;
  use portal\databases\MysqlDatabase as DatabaseObject;
  use portal\clients\Client;
  use portal\services\SupportClientRegisterService as SupportService;
  use portal\helpers\UserAgent as Agent;

  /**
   The class initialised the portal service client object and return the current portal script to load.
   @class
   
  */
  class InitialisePortalService implements Service
  {
      private $response =null;
      private $request =null;
      private $agent   = null;
      private $support = null;
  	  public function __construct(Request  $request, Response $response){
       $this->response =  $response;
       $this->request  =$request;
  	  }
  	  public function execute(){
        $this->response->addParameter("status", true);     
        $this->response;
      }
  }