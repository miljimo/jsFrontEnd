<?php
 namespace portal\tasks;
 use portal\tasks\TryCreate;
 use portal\databases\MysqlDatabase as DB;
 use portal\helpers\Timespam;

 class RegisterServiceTask implements TryCreate{
    private $name   ="";
    private $module ="";
    public function __construct(){

    }
     
    public function setName($name){
     if(is_string($name)){
        $this->name = $name;
     }
     return $this;
    }
    public function setModule($module){
     if(class_exists($module)){
       $this->module  = $module;
     }
     
    }

   

    public function create(){
      $isCreated =false;
      $db = new DB();
      $sql ="Insert Into tbl_client_service
      (col_uid, col_module, col_lastUpdate, col_createDate)
      values
      (:col_uid, :col_module, :col_lastUpdate, :col_createDate)";

      $stmt  = $db->prepare($sql);
      $stmt->bindValue(":col_uid",addslashes(strtolower(trim($this->name))));
      $stmt->bindValue(":col_module",addslashes(strtolower(trim($this->module))));
      $stmt->bindValue(":col_lastUpdate",Timespam::now());
      $stmt->bindValue(":col_createDate",Timespam::now());
      $status = $stmt->execute();
      if(!$status){
        die(print_r($stmt->errorInfo(),true));
       }else{
        if($stmt->rowCount()>0){
        	$isCreated = true;
          } 
       }
      return $isCreated;
    }

 }
    

   

    
