<?php
/**
The script register the devices that can be supported by the client portal
*/
namespace portal\services;
  use portal\services\Service;
  use portal\databases\MysqlDatabase as Database;
  use portal\helpers\TimeSpam;

class RegisterDeviceService implements Service{
	
private   $name          = "";
private   $types         = "";
private   $minVersion    = "";
private   $maxVersion    = "";
private   $clientScript  = "";
private   $defaultPage   = "";
private   $request       = null;
private   $response      = null;
	  /**
	    Create a simple database register services object
	  **/
public function __construct(){

}

     //setter for the devices register

public function setDevice($name){
  if(is_string($name)){
    $this->name= addslashes(trim($name));
  }
  return $this;
}

public function setScript($script)
{
  if(is_string($script)){
    $this->clientScript= addslashes(trim($script));
  }
  return $this;
}

public function setDefaultPage($defaultPage)
{
  if(is_string($defaultPage)){
     $this->defaultPage = $defaultPage;
  }
  return $this;
}
public function setTypes($arrayTypes)
     {
       $types = "";
      if(is_array($arrayTypes)){
        $count = count($arrayTypes);
        for($i=0; $i < $count; $i++){
              $types .=$arrayTypes[$i].",";
           }
          $types=  rtrim($types, ",");
        }else if(is_string($arrayTypes)){
           $types = $arrayTypes;
        }
       $this->types=  addslashes(trim($types));
       return $this;
}

public function setMaxVersion($version){
        $mversion ="";
        if(is_string($version)){
            $mversion =$version;
        }else if(is_numeric($version))
           $mversion = strval($version);
        $this->maxVersion=addslashes(trim($mversion));
        return $this;
}

public function setMinVersion($version){
        $mversion ="";
        if(is_string($version)){
            $mversion =$version;
        }else if(is_numeric($version))
           $mversion = strval($version);
        $this->minVersion=addslashes(trim($mversion));
        return $this;
}
     //return true or false if the devices name exists
public  function isExists(){
      $is= false;
      if($this->db){
          $sql_select = "select *from tbl_device  where (col_name like '%$this->name'
          OR col_genericType like '%$this->name%')";
          $stmt = $this->db->prepare($sql_select);
          $status=  $stmt->execute();
          if(!$status){
            print_r("@RegisterDeviceService@IsExists");
            print_r($stmt->errorInfo());
            exit();
          }
          if($stmt->rowCount() >0)
              $is=true;
      }
      return $is;
}


/**
The function method count the total number of the devices supported
*/
public function count(){
      $count = 0;
      if($this->db)
      {

        $sql_select = "select *from tbl_device ";
        $stmt = $this->db->prepare($sql_select);
        $status=  $stmt->execute();
        if(!$status){
           print_r("@RegisterDeviceService@count");
           print_r($stmt->errorInfo());
           return 0;
          }
        $count  =  $stmt->rowCount();
      }
     return $count;
}


private function insert()
    {
      $insert =false;
        if($this->db ){
              $query = "insert into tbl_device 
              (col_name,
               col_genericType,
               col_scriptUrl,
               col_minVersion,
               col_maxVersion,
               col_status,
               col_defaultPage,
               col_registeredDate,
               col_lastUpdateDate)
               values
               (:col_name,
               :col_genericType,
               :col_scriptUrl,
               :col_minVersion,
               :col_maxVersion,
               :col_status,
               :col_defaultPage,
               :col_registeredDate,
               :col_lastUpdateDate)";
              $stmt = $this->db->prepare($query);
              $stmt->bindValue(":col_name",$this->name);
              $stmt->bindValue(":col_status", 0);
              $stmt->bindValue(":col_defaultPage", $this->defaultPage);
              $stmt->bindValue(":col_genericType", strtolower(trim($this->types)));
              $stmt->bindValue(":col_scriptUrl", $this->clientScript);
              $stmt->bindValue(":col_minVersion", $this->minVersion);
              $stmt->bindValue(":col_maxVersion",$this->maxVersion);
              $stmt->bindValue(":col_registeredDate", Timespam::now());
              $stmt->bindValue(":col_lastUpdateDate",Timespam::now());
              $status = $stmt->execute();
              if(!$status){    
                  print_r("@RegisterDeviceService@insert");            
                  print_r($stmt->errorInfo());
                  return $iscreated;
                }              
              if($stmt->rowCount() > 0) 
                  $iscreated=true;
            }
     return $insert ;
}


/*The insert function to execute the services return false or true if the devices is recorded*/
public function execute(){
     $this->db =new  Database();  
      $iscreated =  false;
      if(!$this->isExists()){
        $iscreated =  $this->insert();
       }
  return $iscreated;
}



}
