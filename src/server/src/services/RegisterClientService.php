<?php
/**
  The script register the portal client into the mysql database connection
*/
namespace portal\services;
  use portal\services\Service;
  use portal\http\Request as PortalRequest;
  use portal\http\Response;
  use portal\databases\MysqlDatabase as Database;
  use portal\helpers\Timespam;

class  RegisterClientService implements Service{
	// parameter requires by this services to register the client
 
    private  $browser         = "";
    private  $defaultPage     = "";
	  private  $ipAddress       = "";
	  private  $macAddress      = "";
	  private  $location        = "";
	  private  $softwareVersion = "";
	  private  $hardwardVersion = "";
    private  $clientId        = "";
    private  $status          = false;
    private  $os              = "";
    protected $db             = null;
    private $request          = null;

	  /**
	    Create a simple database register services object
	  **/
public function __construct(PortalRequest $request, $response){
       $this->request = $request; 
       $this->response =$response;     
        //Create the table names for the database script if not exists
       $this->ipAddress       = addslashes($this->request->get("clientIpAddress"));
      
}

/**
The method count the total number of register clients in the system
*/
public function count()
{
  if(!$this->db)return 0;
  $counter =0;
  $sql_count = "select *from tbl_client";
  if($this->db){
      $stmt = $this->db->prepare($sql_count);
      $status = $stmt->execute();
      if(!$status){
        print_r("@RegisterClientService@count");
         die(print_r($stmt->errorInfo(),true));
       }
       $counter= $stmt->rowCount();
  }
  return $counter;
}

/**
  Check if the client has already be registered with the system
  @method
*/
protected function isExists(){
  if(!$this->db)return true;
        $this->ipAddress    = strtolower(trim(addslashes($this->request->get("clientIpAddress"))));
        $this->macAddress   = strtolower(trim(addslashes($this->request->get("clientMacAddress",""))));
      
       $isExists= false;
       if($this->db){
        $sql_exists=  "select *from tbl_client
        where col_ipaddress='$this->ipAddress' OR ((col_macAddress !='null' || col_macAddress !='')
         AND col_macAddress='$this->macAddress')";
        $statement = $this->db->prepare($sql_exists);
        $statement->bindValue(":col_ipaddress",$this->ipAddress);
        $statement->bindValue(":macAddress",$this->macAddress);
        $status =$statement->execute();
        if(!$status){
          print_r("@RegisterClientService@isExistst");
          die(print_r($statement->errorInfo(),true));
        }else{
          if($statement->rowCount()>0){
            $isExists=  true;
          }
        }
       }
return $isExists;
}

/**

The function validated the inpute data send
@return true if validated else false;
*/

protected  function validate(){

  $okay= true;
  $this->ipAddress       =  strtolower(trim(addslashes($this->request->get("clientIpAddress"))));  
  $this->macAddress      =  strtolower(trim(addslashes($this->request->get("clientMacAddress",""))));  
  $this->browser         =  strtolower(trim(addslashes($this->request->get("clientBrowser",""))));
  $this->defaultPage     =  trim(addslashes($this->request->get("clientDefaultPage","")));
  $this->location        =  trim(addslashes($this->request->get("clientLocation","")));  
  $this->os              =  trim(addslashes($this->request->get("clientOs","")));   
  $this->status          =  $this->request->get("status", false);  
  $this->softwareVersion =  addslashes($this->request->get("clientSoftwareVersion",""));
  $this->hardwardVersion =  addslashes($this->request->get("clientHardwareVersion",""));  
  $this->clientId        =  $this->count() + 1;  
  if($this->ipAddress==null  || empty($this->browser) || $this->browser==null ){
    $okay=false;
  }
 return $okay;
}

//get the client current default page
private function loadDefaultPage(){
  $page =null;
  if($this->db){
      $sql= "select col_defaultPage, col_clientId from tbl_client where col_ipaddress=:ipAddress";
      $stmt= $this->db->prepare($sql);
      $stmt->bindValue(":ipAddress",$this->ipAddress);
       $status =$stmt->execute();
       if(!$status){
          print_r("@RegisterClientService@loadDefaultPage");
          print_r($stmt->errorInfo());
          exit();
       }

       if($stmt->rowCount()>0){
            //there is a record found
            $row   = $stmt->fetch(Database::FETCH_ASSOC);
            $page   = $row["col_defaultPage"];
            $this->clientId = $row["col_clientId"];
            $this->response->addParameter("clientDefaultPage",$page);
            $this->response->addParameter("clientId", $this->clientId);
     }
     
  }
return $page;
}



/**
 The execute function create new user-client on the database on the given data provided
 @method 

*/
public function execute()
{

  $this->db = new Database();
  $this->db->useDatabase();

  $loadClientConfig  = true;
  if(!$this->isExists())
     {

       $status =   $this->validate();
       if($status){
         $status =   $this->store();
          $this->response->addParameter("status",$status);
       }else {
           $loadClientConfig = false;
           $ipAddress = $this->ipAddress;
           $this->response->addParameter("error","Client device not yet supported, please contact administrator.");
       }
    }else{
      //load the client current default page
      $this->defaultPage = $this->loadDefaultPage();
      if($this->defaultPage){
          $this->response->addParameter("clientDefaultPage",$this->defaultPage);
      }
    }
  if($loadClientConfig){
     $this->response->addParameter("status",true);
  }
   $this->db = null;
   return $this->response;
}


/**
 Create the client details
*/

private function store()
{
  $okay=false;
  $stmt=null;
  try{
  $query = "insert into tbl_client(col_broswer,col_ipaddress,col_macAddress,col_location,
               col_defaultPage,col_os,col_softwareVersion,col_hardwareVersion,col_clientId,
               col_status,col_registered_date,col_last_access_date)
               VALUES
               (:col_broswer,:col_ipaddress,:col_macAddress,:col_location,
               :col_defaultPage,:col_os,:col_softwareVersion,:col_hardwareVersion,:col_clientId,
               :col_status,:col_registered_date,:col_last_access_date)";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(":col_broswer"        , $this->browser);
            $stmt->bindValue(":col_ipaddress"      , $this->ipAddress);
            $stmt->bindValue(":col_macAddress"     , $this->macAddress);
            $stmt->bindValue(":col_location"       , $this->location);
            $stmt->bindValue(":col_defaultPage"    , $this->defaultPage);
            $stmt->bindValue(":col_os"             , $this->os);
            $stmt->bindValue(":col_softwareVersion", $this->softwareVersion);
            $stmt->bindValue(":col_hardwareVersion", $this->hardwardVersion);
            $stmt->bindValue(":col_clientId"       , $this->clientId);
            $stmt->bindValue(":col_status"          ,$this->status);
            $stmt->bindValue(":col_registered_date" , Timespam::now());
            $stmt->bindValue(":col_last_access_date",Timespam::now());
            $status =$stmt->execute();
           if(!$status){
               print_r("@RegisterClientService@store");
              die(print_r($stmt->errorInfo(),true));
          }else{
              if($stmt->rowCount()>0)
                $this->response->addParameter("clientId", $this->clientId);
                $okay=  true;
          }
        }catch(Exeception $error)
        {
           die($error);
       }
 $stmt=null;
 return $okay;
}

}//end class