<?php
namespace portal\services;
use portal\services\Service as IService;
use portal\http\Response;

class ErrorService implements IService{


  private $response =null;
  public function __construct(Response $response){
       $this->response = $response;
  }

  /*
    The interface to execute the service task
    @return {Response} return a response object fro the client
  */
  public function execute(){
  	$this->response->expire();
    return $this->response;
  }

};
