<?php
 namespace portal\services\users;
  use portal\services\Service;
  use portal\http\Request;
  use portal\http\Response;
  use portal\databases\MysqlDatabase as DB;
  use portal\helpers\UserValidator as Validator;
  use \portal\tasks\UserAccount;

  /**
   The service check if the current user exists and return the states of the users 
  */


 class RegisterUserService implements Service{
 	 private $request      = null;
 	 private $response     = null;
   //fields
 	 private $username     = null;
 	 private $password     = null;
   private $email        = null;
   private $firstname    = null;
   private $lastname      = null;
   private $data_created = null;
   private $validator    = null;
   private $userAccount  = null;



 	public function __construct(Request $request, Response $response){
 		$this->request   = $request;
 		$this->response  = $response;
    $this->validator = new Validator();
    $this->userAccount = new UserAccount();

    $this->username   = $this->request->get("c_username","");
    $this->password   = $this->request->get("c_password","");
    $this->firstname  = $this->request->get("c_firstname","");
    $this->lastname    = $this->request->get("c_lastname","");
    $this->creator_id = $this->request->get("c_creator_id","");
    $this->email      = $this->request->get("c_email","");

 	}
  
    private function setDetails($details){
      if(!is_array($details))return $this;
    $this->username   = isset($details["username"])?$details["username"]:"";
    $this->password   = isset($details["password"])?$details["password"]:"";
    $this->firstname  = isset($details["firstname"])?$details["firstname"]:"";
    $this->lastname    = isset($details["lastname"])?$details["lastname"]:"";
    $this->creator_id = isset($details["creator"])?$details["creator"]:"";
    $this->email      = isset($details["email"])?$details["email"]:"";
    $this->date_create= isset($details["create_date"])?$details["create_date"]:"";
    $this->date_create= isset($details["last_update_date"])?$details["last_update_date"]:"";   
    return $this;
  }




  private function getDetails(){
    $details = [];
    $details["username"]   = $this->username;
    $details["password"]   = $this->password;
    $details["firstname"]  = $this->firstname;
    $details["lastname"]    = $this->lastname;
    $details["creator_id"] = $this->creator_id;
    $details["email"]      =  $this->email; 
    return $details;
  }

  private function validated(){
    $info =  $this->getDetails();
    return $this->validator->valid($info);
  }

private function getErrors(){
   $errors=[];
   $this->validator->errors((function($fieldname, $errorMsg) use(&$errors){
        $errors[$fieldname] =$errorMsg;
   }));
   return $errors;
  }

 public function execute(){
    $status = $this->validated();
    $this->response->addParameter("status",false);
    if(!$status){
        $this->response->addParameter("error", $this->getErrors());
    }else{
        $this->userAccount->setInfo($this->getDetails());
        if($this->userAccount->exists()){
           //check if is the email that exists
          $email  = $this->email;
          $username  = $this->username;
           $this->response->addParameter("error", "Account username [$username] already exists");
          if($this->userAccount->emailExists()){
             $this->response->addParameter("error", "This account email [$email] already exists");
          }
        }else{
          //create the account 
          $status = $this->userAccount->create();
          if($status){
              $this->response->addParameter("status",true);
              $user =  $this->userAccount->get();
              $this->response->addParameter("user", $user);
          }
        }
       //check if the user already exists
    }
    return $this->response;
 	}
 }

