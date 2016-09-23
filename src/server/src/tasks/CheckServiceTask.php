<?php
/**
 The class task check if the service already exists in the server or not
*/
 namespace portal\tasks;
 use portal\tasks\TryCheck;
 use portal\databases\MysqlDatabase as DB;


 class CheckServiceTask implements TryCheck{
    private $name   ="";
    
    public function __construct(){

    }
   
    public function setName($name){
     if(is_string($name)){
        $this->name = $name;
     }
     return $this;
    }
   
/**
 The function check if the service exists or not
*/
 public function exists(){
        $exists  = false;
        $db = new DB();
        $sql = "select *from tbl_client_service  where col_uid=:col_uid";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(":col_uid", addslashes(strtolower(trim($this->name))));
        $status = $stmt->execute();
        if(!$status){
           print_r($stmt->errorInfo());
        }else{
          if($stmt->rowCount() >0)
          {
             $exists=true;
          }
        }
       $db=null;
       return $exists;
    }

 }
