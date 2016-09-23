<?php
namespace portal;
use Monolog\Logger as MonoLogger;
use Monolog\Handler\StreamHandler as MonologStreamHandler;



class Logger
{
  private static $instance;
  private $logger =null;
  public function __construct()
  {
  	$this->logger =  new MonoLogger('services');
  	$this->logger->pushHandler(new MonologStreamHandler('php://stdout', MonoLogger::WARNING)); // <<< uses a stream
  }

  public  static  function getInstance()
  {
    if(self::$instance==null)
    	self::$instance = new Logger();
    return self::$instance;
  }

  public function warn($message)
  {
    $this->logger->addWarning($message);
  }

  public function error($message){
  	 $this->logger->addError($message);
  }
  public function getLogger(){
  	return $this->logger;
  }

}
