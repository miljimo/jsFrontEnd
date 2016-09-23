<?php
  namespace portal\services\users;
  use portal\services\Service;
  use portal\http\Request;
  use portal\http\Response;
  use portal\tasks\LoginAttemptTask as AttemptCount;
  use portal\tasks\ActivateAccountTask as AccountActivator;
  use portal\tasks\UserAccount as UserAccount;
  use portal\helpers\Session;
  use protal\databases\MysqlDatabase as DB;
  use portal\devices\Device;



/**
 The funtion authenticated the user on the server pms
*/
 class UserAuthenticationService implements Service{
   private $request     = null;
   private $response    = null;
   private $session_id  = "";
   private $username    = "";
   private $password    = "";
   private $ipaddress   = "";
   private $attempt     = null;
   private $activator   = null;
   private $accountExists= null;
   const  MAX_LOGIN_ATTEMPT = 3;
   public function __construct(Request $request, Response $response){
       $this->request     = $request;
       $this->response    = $response;  
       $this->session_id  =  $this->request->request->get("clientSessionId",Session::getId());
       $this->username    = $this->request->get("c_username","");
       $this->password    = $this->request->get("c_password","");
       $this->ipAddress   = Device::getInstance()->getIpAddress();
       $this->attempt     = new AttemptCount();  
       $this->attempt->setUsername($this->username); 
       $this->attempt->setSessionId($this->session_id);
       $this->attempt->setIpAddress($this->ipaddress) ;
       //check ativator to make sure the user is already created; 
       $this->activator     = new AccountActivator();
       $this->userAccount = new UserAccount();
       $this->userAccount->setInfo($this->getDetails());

   }

   private function getDetails(){
       $info=[];
       $info["username"] = $this->username;
       $info["password"] = $this->password;
       $info["session_id"] = $this->session_id;
      return $info;
   }

  private function validated(){
    if(!isset($this->username) || empty($this->username))
       return false;
     else if(!isset($this->password)){
      return false;
     }else{
      return true;
     }
  }

  public function execute(){
    $this->response->addParameter("status",false);
    $this->response->addParameter("error"," The username or password does not exists");
    if($this->validated()){
      $exist = $this->userAccount->exists();
      if($exist){
         if($this->userAccount->isUser()){
            $user = $this->userAccount->get();
            $this->response->addParameter("status",true);
            $this->response->removeParameter("error");
            $this->response->addParameter("user", $user);
         }else{
          $username  = $this->username;
           $this->response->removeParameter("error", "Invalid password for the username [$username]");
         }
      }else{
         $this->response->addParameter("error"," The username does not exists");
      }
    }
    return $this->response;
   }



 }
  


