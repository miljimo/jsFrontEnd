<?php
/**
 The portal php entry point
*/
 $autoloader = require __DIR__ . '/vendor/autoload.php';
 use portal\Kernal;
 use portal\http\Request;
 use portal\http\Response;
 use portal\helpers\Session;



Session::init();
$kernal  = Kernal::capture($request = new Request());
$response = $kernal->execute();
$response->send();
Kernal::terminate($request, $response);





