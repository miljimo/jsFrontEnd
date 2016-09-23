<?php
   namespace portal\tasks;
   use portal\tasks\TryCheck;
   use portal\tasks\TryCreate;
   use portal\tasks\TryGet;
   use portal\tasks\TryUpdate;
   use portal\databases\MySqlDatabase as DB;
   use portal\helpers\UUID as UUIDGenerator;
   use portal\helpers\TimeSpam as TimeSpan;

   class UserAccount implements TryCheck,TryCreate, TryGet, TryUpdate{
       private $uuid      = null;
       private $username  = null;
       private $password  = null;
       private $lastname  = null;
       private $firstname = null;
       private $email     = null;
       private $date_created =null;
       private $date_updated =null;


     public function setUID($uid)
       {
        if(is_string($uid))
          $this->uuid  = addslashes(trim(strtolower($uid)));
          return $this;
      }
      public function setUsername($username)
       {
       	if(is_string($username))
          $this->username  = addslashes(trim(strtolower($username)));
          return $this;
      }
     public function setEmail($email)
       {
        if(is_string($email))
          $this->email  = addslashes(trim(strtolower($email)));
        return $this;
      }
    

    function setInfo($info){
      $this->uuid = UUIDGenerator::uid(time());
      $this->username      = isset($info["username"])?$info["username"]:"";
      $this->password      = isset($info["password"])?$info["password"]:"";
      $this->firstname     = isset($info["firstname"])?$info["firstname"]:"";
      $this->lastname      = isset($info["lastname"])?$info["lastname"]:"";
      $this->email         = isset($info["email"])?$info["email"]:"";
      $this->date_created  = TimeSpan::now();
      $this->date_updated  = TimeSpan::now();
    }

    function exists(){
       	$exists =false;
     		$db  = new DB();
        $username  = $this->slashes($this->username);
        $email      =$this->slashes($this->email);
     		$sql ="select col_username from tbl_client_user where col_username=:col_username or col_email=:col_email";
     		$stmt= $db->prepare($sql);
     		$stmt->bindValue(":col_username", $username);
        $stmt->bindValue(":col_email",  $email);
     		if(!$stmt->execute()){
          throw new \Exception(print_r($stmt->errorInfo(),true));}
     		if($stmt->rowCount() >0){
              $exists =true;
     		}
     		$stmt=null;
          $db =null;
     		return $exists;
   }

    public  function emailExists(){
        $exists =false;
        $db  = new DB();
        $email      =$this->slashes($this->email);
        $sql ="select col_username from tbl_client_user where  col_email=:col_email";
        $stmt= $db->prepare($sql);
        $stmt->bindValue(":col_email",  $email);
        if(!$stmt->execute()){
          throw new \Exception(print_r($stmt->errorInfo(),true));}
        if($stmt->rowCount() >0){
              $exists =true;
        }
        $stmt=null;
          $db =null;
        return $exists;
   }

   public function isUser()
   {
        $exists =false;
        $db  = new DB();
        $username  =  $this->slashes($this->username);
        $password     =$this->makeSha1($this->password);
        $sql ="select col_username from tbl_client_user where (col_username =:col_username OR col_email=:col_username) AND col_password=:col_password";
        $stmt= $db->prepare($sql);
        $stmt->bindValue(":col_username", $username);
        $stmt->bindValue(":col_password",  $password);
        if(!$stmt->execute()){
          throw new \Exception(print_r($stmt->errorInfo(),true));}
        if($stmt->rowCount() >0){
              $exists =true;
        }
        $stmt=null;
          $db =null;
        return $exists;

   }



   private function slashes($str){
      return strtolower(trim(addslashes($str)));
   }

   private function makeSha1($password){
     return sha1(addslashes($password));
   }


   //Function to created the user account

   function create(){
    $iscreated =false;
    $db = new DB();

    $sql= "insert into tbl_client_user 
    (col_uid, col_username, col_firstname, col_lastname, col_email, col_password, col_date_created, col_last_update)
    values(:col_uid, :col_username, :col_firstname, :col_lastname, :col_email, :col_password, :col_date_created, :col_last_update)";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":col_uid",$this->slashes($this->uuid));
    $stmt->bindValue(":col_username",$this->slashes($this->username));
    $stmt->bindValue(":col_firstname",$this->slashes($this->firstname));
    $stmt->bindValue(":col_lastname",$this->slashes($this->lastname));
     $stmt->bindValue(":col_email",$this->slashes($this->email));
    $stmt->bindValue(":col_password",$this->makeSha1($this->password));
    $stmt->bindValue(":col_date_created",$this->date_created);
    $stmt->bindValue(":col_last_update",$this->date_updated);
    $status  = $stmt->execute();
    if(!$status){
       die(print_r($stmt->errorInfo(),true));
    }

    if($stmt->rowCount()>0)
      $iscreated=true;
    $stmt=null;
    $db=null;
    return $iscreated;

   }

   //function to get the user information
   
   function get(){
     $user =array();
     $db  = new DB();
     $username    = $this->slashes($this->username);
     $email      =$this->slashes($this->email);
     $uid        =$this->slashes($this->uuid);
     $sql ="select * from tbl_client_user where col_uid=:col_uid or col_email=:col_email or col_username=:col_username";
     $stmt= $db->prepare($sql);
     $stmt->bindValue(":col_username", $username);
     $stmt->bindValue(":col_email",  $email);
     $stmt->bindValue(":col_uid",  $uid);

     if(!$stmt->execute()){
          throw new \Exception(print_r($this->errorInfo(),true));}
     if($stmt->rowCount() >0){
        $row = $stmt->fetch(DB::FETCH_ASSOC);
        $user["uid"]            = $row["col_uid"];
        $user["username"]       = $row["col_username"];
        $user["email"]          = $row["col_email"];
        $user["firstname"]      = $row["col_firstname"];
        $user["lastname"]       = $row["col_lastname"];
        $user["createDate"]     = $row["col_date_created"];
        $user["lastUpdateDate"] = $row["col_last_update"];
     }
     $stmt=null;
     $db =null;
     return $user;
   }




   function update(){
    $isTrue=false;


    return $isTrue;

   }

}