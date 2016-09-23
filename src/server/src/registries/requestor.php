<?php
  use portal\register;
  use portal\http\Request;
  use Portal\http\Response;


  interface Requestor{
  	public function request($http_request, $http_response);
  	public function autho();
  	public function authoPage();
  };