<?php
 namespace portal\tasks;
 use portal\tasks\TryCheck;
 use portal\tasks\TryUpdate;
 use portal\tasks\TryGet;
 use portal\tasks\TryCreate;
 use portal\databases\MySqlDatabase as DB;



/**
  The module class check the database if user account has be activated or not.
  It also check if user account has be created.
  
*/
 class ActivateAccountTask implements TryCheck, TryUpdate, TryGet, TryCreate
 {
    private $username 			= 	"";
    private $ipaddress 			= 	"";
    private $reason   			= 	"";
    private $last_update_date	=	"";
    private $date_created		=	"";
    private $activator 		    =	"";
    private $status   			= 	false;
    
public function setUsername(string $name){
    	$this->username = $name;
}
 /**
  The function check if the user account is in the list of activated account;
*/

public function exists(){
    	$db = new DB();
    	$exists =false;
    	$username = addslashes(trim(strtolower($this->username)));
        $sql   = "select col_username from tbl_account_activated where col_username=:col_username";
        $stmt  = $db->prepare($sql);
        $stmt->bindValue(":col_username", $username);
        if(!$stml->execute()){
        	throw new \Exception(print_r($stmt->errorInfo(),true));
        }
        if($stmt->rowCount()>0)
        	$exists=true;
        $stmt= null;
        $db  = null;
        return $exists;
}
/**
 The function return the status of the account if its deactive or active false or true
*/

public function  get(){
  $db = new DB();
  $username     = addslashes(trim(strtolower($this->username)));
  $sql="select *from tbl_account_activated where col_username =:col_username";
  $stmt->prepare($sql);
  $stmt->bindValue("col_username", $username);
  if(!$stmt->execute()){
     throw new \Exception(print_r($stmt->errorInfo()));
  }
  if($stmt->rowCount() > 0){
  	 $row = $stmt->fetch(DB::FETCH_ASSOC);
     $this->status     = $row["col_status"];
     $this->ipaddress  = $row["col_ipaddress"];
     $this->reason     = $row["col_reason"];
     $this->activator  = $row["activator"];
     $this->last_update_date = $rowp["col_last_date_updated"];
     $this->date_created   = $row["col_date_created"];
  }
  $stmt=null;
  $db  =null;
  return $this->status;
}
/**
 The function create new users
*/

public function create(){
    	$db = new DB();
    	$exists       = false;
    	$username     = addslashes(trim(strtolower($this->username)));
    	$ipaddress    = addslashes(trim(strtolower($this->ipaddress)));
    	$now          = TimeSpan::now();
    	$reason       = addslashes(strtolower($this->reason));
    	$status       = boolval($this->status);
    	$activator  = addslashes(trim(strtolower($this->activator)));

        $sql   = "insert into tbl_account_activated  
        (col_username, col_ipaddress, col_date_created, col_last_date_updated, col_status, col_reason, col_activator)
        values
        (:col_username, :col_ipaddress, :col_date_created, :col_last_date_updated, :col_status, :col_reason, :col_activator)";
        $stmt  = $db->prepare($sql);
        $stmt->bindValue(":col_username"    , $username);
        $stmt->bindValue(":col_ipaddress"   , $ipaddress);
        $stmt->bindValue(":col_date_created", $now);
        $stmt->bindValue(":col_last_date_updated,"   , $now);
        $stmt->bindValue(":col_status"   ,$status);
        $stmt->bindValue(":col_reason", $reason);
        $stmt->bindValue(":col_activator", $activator);
        if(!$stml->execute()){
        	throw new \Exception(print_r($stmt->errorInfo(),true));
        }
        if($stmt->rowCount()>0)
        	$exists=true;
        $stmt= null;
        $db  = null;
        return $exists;
    }
/* The function will update the user activated record and the reason
*/
 public function update(){
  $db = new DB();
 $isupdate =false;
 $username     = addslashes(trim(strtolower($this->username)));
 $ipaddress    = addslashes(trim(strtolower($this->ipaddress)));
 $now          = TimeSpan::now();
 $reason       = addslashes(strtolower($this->reason));
 $status       = boolval($this->status);
 $activator  = addslashes(trim(strtolower($this->activator)));
 $sql ="update tbl_account_activated set col_reason=:col_reason,
    		col_status=:col_status,
    		col_ipaddress=:col_ipaddress,
    		col_last_date_updated=:col_last_date_updated,
    		col_activator=:col_activator
     where 	col_username=:col_username";

  $stmt = $db->prepare($sql);
  $stmt->bindValue(":col_username"    , $username);
  $stmt->bindValue(":col_ipaddress"   , $ipaddress);
  $stmt->bindValue(":col_last_date_updated,"   , $now);
  $stmt->bindValue(":col_status"   ,$status);
  $stmt->bindValue(":col_reason", $reason);
  $stmt->bindValue(":col_activator", $activator);
  if($stmt->execute()){
  	throw new \Exception(print_r($stmt->erroInfo(),true));
  };
  if($stmt->rowCount()>0){
  	$isupdate=true;
  }
  $stmt=null;
  $db =null;
  return $isupdate;
 }

 }
