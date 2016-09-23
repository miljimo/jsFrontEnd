<?php
 namespace portal\tasks;
 use portal\tasks\TryGet;
 use portal\databases\MysqlDatabase as DB;


 class GetServiceTask implements TryGet{
    private $name   ="";
    private $module ="";
    private $createDate="";
    private $lastUpdate="";

    public function __construct(){

    }
    public function setName($name){
     if(is_string($name)){
        $this->name = $name;
     }
     return $this;
    }

    public function getModule(){
     return $this->module;
    }

    public function getName(){
      return $this->name;
    }

    public function createDate(){
    	return $this->createDate;
    }

public function get(){
    $isRetrived =false;
    try{
      $db = new DB();
      $sql ="Select * from tbl_client_service where col_uid=:col_uid";
      $stmt  = $db->prepare($sql);
      $stmt->bindValue(":col_uid",addslashes(strtolower(trim($this->name))));
      $status = $stmt->execute();
      ;
      if(!$status){
         die(print_r($stmt->errorInfo(),true));
       }else{
        if($stmt->rowCount()>0){
        	$isRetrived = true;
        	$row = $stmt->fetch(DB::FETCH_ASSOC);
        	$this->name  =  stripslashes($row["col_uid"]);
        	$this->module = stripslashes($row["col_module"]);
        	$this->createDate = $row["col_createDate"];
        	$this->lastUpdate =$row["col_lastUpdate"];
          } 
       }
       $stmt=null;
       $db=null;
   }catch(\Exception $error){
       print_r($error);
   }
   return  $isRetrived;
 }

 }
    

   

    
