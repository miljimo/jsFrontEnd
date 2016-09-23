<?php

  namespace portal\services;
  use portal\http\Response;
  use portal\http\Request;
  use portal\databases\MysqlDatabase as Database;
  use portal\helpers\TimeSpam;



/**
@class
The function created and get the current session last page of the client 
This class module make sure the client current page is retain when the user mistaken refresh its page
*/

  class SessionCheckPageService implements Service{
  	private $request    = null;
  	private $response   = null;
  	private $db         = null;
  	private $session_id = null;
  	private $clientIpaddress   =null;
  	private  $isRetrived    = false;
  	private $currentPage = "";

  	public function __construct(Request $request,Response $response){
    	$this->request  = $request;
    	$this->response = $response;

  	}
  /**
 	 @method
 	 @memberof SessionCheckPageService
 	 @param {string} $sessionId the current request Session Id
  */
   public function setSessionId($sessionId){
    if(is_string($sessionId))
    	$this->session_id=$sessionId;
    return $this;
   }
  
   //set the client IpAppress
   public function setClientIpAddress($clientIpaddress){
   	if(is_string($clientIpaddress))
   			$this->clientIpaddress = $clientIpaddress;
   	return $this;
   }


   //set the current page if not not found
   public function setClientDefaultPage($page)
   {
   	  if(is_string($page)){
   	  	 $this->currentPage = $page;
   	  }
    return $this;
   }

/**
 The function create a new record for the tbl_session_page with the default page
*/
 private function createClientSessionPage()
 {
 	$sql="insert into tbl_client_page_session
 	(col_client_sessionId,col_client_ipAddress,col_client_currentPage,col_createDate,col_lastUpdate)
 	values
 	(:col_client_sessionId,:col_client_ipAddress,:col_client_currentPage,:col_createDate,:col_lastUpdate)";

  $ipaddress = addslashes(trim(strtolower($this->clientIpaddress)));
  $sessionId = addslashes(trim(strtolower($this->session_id)));
 	$stmt= $this->db->prepare($sql);
 	$stmt->bindValue(":col_client_sessionId",$sessionId);
  $stmt->bindValue(":col_client_ipAddress", $ipaddress);
  $stmt->bindValue(":col_client_currentPage",addslashes($this->currentPage));
  $stmt->bindValue(":col_createDate",TimeSpam::now());
  $stmt->bindValue(":col_lastUpdate",TimeSpam::now());
  $status =$stmt->execute();
    if(!$status){
    	print_r($stmt->errorInfo());
    	exit();
    }

    $rowCount = $stmt->rowCount();
    if($rowCount > 0)return true;
    return false;
 }

 //Return the page if found else return false;
private  function getPageIfExists(){

    $ipaddress = addslashes(trim(strtolower($this->clientIpaddress)));
    $sessionId = addslashes(trim(strtolower($this->session_id)));
  	$isFound = false;
   	$sql_session ="SELECT * FROM tbl_client_page_session WHERE (col_client_ipAddress =:col_client_ipAddress);";
    $stmt= $this->db->prepare($sql_session);
       //bindValue    
    $stmt->bindValue(":col_client_ipAddress",$ipaddress);
    $status =   $stmt->execute();
    if(!$status){
       	print_r($stmt->errorInfo());
       	return ;
    }
    $rowCount  = $stmt->rowCount();
    if($rowCount > 0) {        
        $row = $stmt->fetch(Database::FETCH_ASSOC);	
        $isFound = $row["col_client_currentPage"];
    }

   return $isFound;
}

public function getCurrentPagePath($ipaddress)
{
   $this->db = new Database();
   $this->db->useDatabase();
    $ipaddress = addslashes(trim(strtolower($ipaddress)));
   
    $isPath = null;
    $sql_session ="SELECT * FROM tbl_client_page_session WHERE (col_client_ipAddress =:col_client_ipAddress);";
    $stmt= $this->db->prepare($sql_session);
       //bindValue    
    $stmt->bindValue(":col_client_ipAddress",$ipaddress);
    $status =   $stmt->execute();
    if(!$status){
        print_r($stmt->errorInfo());
        return ;
    }
    $rowCount  = $stmt->rowCount();
    if($rowCount > 0) {        
        $row = $stmt->fetch(Database::FETCH_ASSOC); 
       $isPath = $row["col_client_currentPage"];
    }
   $this->db=null;  
   return $isPath;
}


public function execute(){
       $this->db = new Database();
       $this->db->useDatabase();
       $pageIfExist = $this->getPageIfExists();
       if($pageIfExist===false)
       {
         $this->createClientSessionPage();
       }else{
         $this->currentPage=$pageIfExist;
       }
      $this->response->addParameter("clientDefaultPage", $this->currentPage);

    return $this->response;
}


 }//end class