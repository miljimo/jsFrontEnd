<?php
   namespace portal\tasks;
   use portal\tasks\TryGet;
   use portal\tasks\TryCreate;
   use portal\tasks\TryCheck;
   use portal\tasks\TryUpdate;
   use portal\helper\TimeSpam;
   use portal\databases\MysqlDatabase as DB;

  /**
    The class module monitor user login attempts
  */
   class LoginAttemptTask implements TryCheck, TryGet, TryCreate, TryUpdate
   {  

     private $session_id= null;
     private $username  = null;
     private $attempts  = 0;
     private $ipAddress ="";
     private $attempt_date = "";

     public function setUsername($name){
     if(is_string($name))
     	 $this->username = $name;
     }
     public function setSessionId($session_id){

     }
     public function setIpAddress($ipAddress){
     	if(is_string($ipAddress))
     		$this->ipAddress = $ipAddress;
     }

  
  /**
  */
     private function increaseAttempt(int $number){
     	$db= new DB();
     	$username  = addslashes(strtolower(trim($this->username)));
     	$session_id  = addslashes($this->session_id);
     	$sql ="update tbl_login_attempt set col_attempt =:attempt where col_username=:username 
     	and col_session_id=:session_id";
     	$stmt = $db->prepare($sql);
     	$stmt->bindValue(":attempt",  intval($number) + 1);
     	$stmt->bindValue(":col_username", $username);
     	$stmt->bindValue(":col_session_id", $session_id);
     	$status = $stmt->execute();
     	if(!$status){
     	    throw new \Exception(print_r($stmt->errorInfo(),true));
     	}
     	if($stmt->rowCount()>0)
     		   return true;
     	return false;
     }
     //resetAttempts
     private function resetAttempt(){
     	return $this->increaseAttempt(-1);
     }

     /*
      The function get the number of user attempt numbers 
     */
     public function get(){
     	$db= new DB();
     	$username  = addslashes(strtolower(trim($this->username)));
     	$sql ="select col_attempt from tbl_login_attempt  where col_username=:username";
     	$stmt = $db->prepare($sql);
     	$stmt->bindValue(":col_username", $username);
     	$status = $stmt->execute();
     	if(!$status){
     	    throw new \Exception(print_r($stmt->errorInfo(),true));
     	}
     	if($stmt->rowCount()>0){
     		 $row = $stmt->fetch(DB::FETCH_ASSOC);
     		 $this->attempts       = intval($row["col_attempt"]);
     		 $this->session_id     = stripslashes($row["col_session_id"]);
     		 $this->username       = stripslashes($row["col_username"]);
     		 $this->attempt_date   = stripslashes($row["col_attempt_date"]);
     	}	
     	$stmt= null;
     	$db  = null;  
     	return $this->attempts;
     }


  /**
    The function created the users first records for login attempts if they have not exists
    @author Obaro
  */

     public function create(){
     	$isCreated  = false;
     	$db= new DB();
     	$username    =  addslashes(strtolower(trim($this->username)));
     	$session_id  =  addslashes(strtolower(trim($this->session_id)));
     	$ipaddress   =  addslashes(trim($this->ipAddress));
     	$dateNow     =  TimeSpan::now();
     	$sql ="insert into tbl_login_attempt (col_username,col_attempt, col_session_id, col_ipAddress, col_attempt_date)
     	value(:col_username, :col_attempt, :col_session_id, :col_ipAddress, :col_attempt_date, col_create_date=:col_create_date)";
     	$stmt = $db->prepare($sql);
     	$stmt->bindValue(":col_username", $username);
     	$stmt->bindValue(":col_session_id", $session_id);
     	$stmt->bindValue(":col_ipAddress", $ipaddress);
     	$stmt->bindValue(":col_attempt", $this->attempts);
     	$stmt->bindValue(":col_attempt_date", $dateNow);
     	$stmt->bindValue(":col_create_date", $dateNow);
     	$status = $stmt->execute();
     	if(!$status){
     	    throw new \Exception(print_r($stmt->errorInfo(), true));
     	}
     	if($stmt->rowCount()>0){
     		$isCreated=true;
     	}	
     	$stmt= null;
     	$db  = null;  
     	return $isCreated;
     }

     /**
      The function check if the user already exists or not
     */

      public function exists (){
      	 $username    =  addslashes(strtolower(trim($this->username)));
		 $db = new DB();
		 $sql ="select *from tbl_login_attempt where col_username=:col_username";
		 $stmt = $db->prepare($sql);
		 $stmt->bindValue(":col_username", $username);
		 if(!$stmt->execute()){
		 	throw new \Exception(print_r($stmt->errorInfo(),true));
		 }
		 if($stmt->rowCount()>0)
		 	return true;
		 return false;
      }


      /**
       The function update the user attempt login details
      */

    public function update(){
    	$isUpdate  =false;
       	$db = new DB();
     	$username    =  addslashes(strtolower(trim($this->username)));
     	$session_id  =  addslashes(strtolower(trim($this->session_id)));
     	$ipaddress   =  addslashes(trim($this->ipAddress));
     	$attempts    =  inval($this->attempts);
     	$dateNow     =  TimeSpan::now();
     	$sql ="update tbl_login_attempt set col_attempt =:attempt, 
     	   col_attempt_date=:col_attempt_date,
     	   col_session_id=:col_session_id, 
     	   col_ipAddress=:col_ipAddress,
     	   where col_username =:col_username";

     	$stmt = $db->prepare($sql);
     	$stmt->bindValue(":col_username",   $username);
     	$stmt->bindValue(":col_session_id", $session_id);
     	$stmt->bindValue(":col_ipAddress",  $ipaddress);
     	$stmt->bindValue(":col_attempt",    $attempts);
     	$stmt->bindValue(":col_attempt_date",$dateNow);
     	$status = $stmt->execute();
     	if(!$status){
     	    throw new \Exception(print_r($stmt->errorInfo(),true));
     	}
     	if($stmt->rowCount() > 0)
     		  $isUpdate =true;

     		$stmt=null;
     		$db=null;
     	return $isUpdate ;
   }




   }


