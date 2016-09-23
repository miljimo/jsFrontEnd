<?php
namespace portal\services;

/**
 The class is the base of all the api services object to person action
 @class
 @author Obaro I. Johnson
 @license MIT

*/
interface Service {

  /*
    The interface to execute the service task
    @return {Response} return a response object fro the client
  */
  public function execute();
}

