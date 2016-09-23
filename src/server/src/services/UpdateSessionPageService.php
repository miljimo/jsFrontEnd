<?php

  namespace portal\services;
  use portal\http\Response;
  use portal\http\Request;
  use portal\databases\MysqlDatabase as Database;
  use portal\helpers\TimeSpam;
  use portal\helpers\Session;



/**
@class
 Th module class constantly update the current client page when ever the client change a page to another.
 This help to keep track on the current page the client is viewing and retain it when the client mistaken referesh her page

*/

  class UpdateSessionPageService implements Service{
  	private $request    = null;
  	private $response   = null;
  	private $db         = null;
  	private $session_id = null;
  	private $clientIpaddress   =null;
  	private $currentPage = "";

  	public function __construct(Request $request,Response $response){
    	$this->request  = $request;
    	$this->response = $response;
      $this->session_id = Session::getId();
      $this->clientIpaddress = $this->request->get("ipAddress","");
      $this->currentPage = $this->request->get("changePageTo",$this->request->get("clientDefaultPage"));      
  	}

 //Return the page if found else return false;
  private  function updateClientPageIfSessionExists(){
    $ipaddress = addslashes(trim(strtolower($this->clientIpaddress)));
    $sessionId = addslashes(trim(strtolower($this->session_id)));
    $pagePath  = $this->request->get("changePageTo");
  	$isFound = false;
     	$sql_session ="UPDATE  tbl_client_page_session  set col_client_currentPage=:col_client_currentPage,
       col_lastUpdate=:col_lastUpdate ,col_client_sessionId =:col_client_sessionId 
      WHERE (col_client_ipAddress =:col_client_ipAddress);";
   
      $stmt= $this->db->prepare($sql_session);
         //bindValue
      $stmt->bindValue(":col_client_sessionId",$sessionId);
      $stmt->bindValue(":col_client_ipAddress",$ipaddress);
      $stmt->bindValue(":col_client_currentPage",addslashes($pagePath));

      $stmt->bindValue(":col_lastUpdate",TimeSpam::now());
      $status =   $stmt->execute();
      if(!$status){
         	print_r($stmt->errorInfo());
         	return ;
      }
      $rowCount  = $stmt->rowCount();
      if($rowCount > 0) {    
          $isFound = true;
      }
     return $isFound;
  }


  /**
  The service function update the client page when it is changed
  */
  public function execute(){
    $this->db = new Database();
    $this->db->useDatabase();  
    if(!$this->updateClientPageIfSessionExists())  {
        $this->response->addParameter("status",false);
        $this->response->addParameter("error","Unable to change the client current page to ".$this->currentPage);
    }else{
       $this->response->addParameter("status",true); 
       $this->response->addParameter("clientDefaultPage",$this->currentPage);
       $this->response->addParameter("clientSessionId",$this->session_id);
    }
   $this->db=null;         
   return $this->response;
  }


}//end class