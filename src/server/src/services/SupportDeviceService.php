<?php
 namespace portal\services;
 use portal\services\Service;
 use portal\databases\MysqlDatabase as Database;
 use portal\services\SessionCheckPageService as PageService;
 use portal\http\Response;
 use portal\http\Request;

 class SupportDeviceService implements Service{


	private $type    = "";
	private $version  = "";
	private $types    = "";
	private $scriptUrl  ="";
	private $name ="";
	private $status = false;
	private $defaultPage ="";
	private $response= null;
	private $request =null;



	function __construct(Request  $request =null ,  Response $response =null){
		$this->request =$request ;
		if(!$this->request)
			$this->request  = Request::createFromGlobal();
	}

    //get the broswer type or name
	public function setType($type){		
	  	if(is_string($type))
	  	{
	  	$this->type=$type;
	  	}
	   return $this;
	  }
   /**
   Get the version of the  broswer or device
   */
	public function setVersion($version){
	  	if(is_string($version))
	  	{
	  		$this->version=$version;
	  	}else if(is_numeric($version)){
	  		$this->version=strval($version);
	  	}
	   return $this;
	}

    public function getDefaultPage(){
    	 return $this->defaultPage;
    }
	public function getScriptUrl(){
		return $this->scriptUrl;
	}

	public function getName(){
		return $this->name;
	}
	public function getTypes(){
		return $this->types;
	}
	public function getStatus(){
		 return $this->status;
	}
	/**col_minVersion,
               col_maxVersion
	 Execute the services to check and load the client for the portal
	*/
	public function execute(){		
	 $this->db = new Database();
	 $this->db->useDatabase(Database::$NAME);
	 $ipAddress  = $this->request->server->get("REMOTE_ADDR");

     $is= false;

      if($this->db){
      	 $type    = addslashes(strtolower($this->type));
      	     	
          $sql_select = "select *from tbl_device  where col_genericType like '%$type%' and  col_genericType!=''";
          $stmt = $this->db->prepare($sql_select);
          $status=  $stmt->execute();
          if(!$status){
          	print_r("@SupportDeviceService@execute");
            exit();
          }
          if($stmt->rowCount() >0){
               $is=true;
               $row = $stmt->fetch(Database::FETCH_ASSOC);
               $this->types         = stripslashes($row["col_genericType"]);
               $this->name          = stripslashes($row["col_name"]);
               $this->scriptUrl     = stripslashes($row["col_scriptUrl"]);
               $this->status        = intval($row["col_status"]);
               $this->defaultPage   = $this->getCurrentPage($ipAddress , $row["col_defaultPage"]);
          }
          $stmt=null;
      }
      $this->db=null;
     
      return $is;
	}

  
  private function getCurrentPage($ipAddress , $default){
  	 $pageService = new PageService(new Request(), new Response());
  	 $page = $pageService->getCurrentPagePath($ipAddress);
  	 if(!$page){
  	 	  $page =$default;
  	 }
  	 return $page;
  }

}