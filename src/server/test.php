 <?php

 $autoloader = require __DIR__ . '/vendor/autoload.php';
 use portal\helpers\UserValidator;
 use portal\helpers\UUID as UUIDGenerator;

$uuid = UUIDGenerator::uid("username");
print_r($uuid);
