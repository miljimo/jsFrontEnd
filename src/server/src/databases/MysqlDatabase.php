<?php
  namespace portal\databases;
 use  portal\helpers\Helper as Matcher;

 class MysqlDatabase extends \PDO {
    //put your code here
    private $response = array();
    private $queryString = null;
    public static $PORT         ="";
    public static $HOSTNAME     ="localhost";
    public static $NAME         ="portal_db";
    public static $USERNAME     ="root";
    public static $PASSWORD     ="";
    public static $instance = null;
    /**

      @method
      @class

    */
    public function __construct($config=null) {
        //connect to the server and to the specific database  
        try {
            parent::__construct("mysql:host=".self::$HOSTNAME.";dbname=".self::$NAME, self::$USERNAME ,self::$PASSWORD);
        } catch (\Exception $err) {
           die($err);
        }
    }
//end functions
    public function createField($name, $type="varchar(40)", $constraints=" ") {
        if (Matcher::IsWord(trim($name))) {
            $fields = "$name  $type  $constraints";
            $this->buildQuery($fields);
        }
    }
    public function createTable($tablename) {
        $query = "Create Table If Not Exists $tablename (" . $this->queryFields() . ")";
        $stmt = $this->prepare($query);
        $abool = $stmt->execute();
        if (!$abool) {
            print_r($stmt->errorInfo());
        }
    }
   private  function buildQuery($field) {
        if (is_string($field)) {
            $this->queryString = $this->queryString . "$field ,";
        }
    }
   private function queryFields() {
        $this->queryString = trim($this->queryString, ",");
        return $this->queryString;
    }

    public function getInstance()
    {
        if(self::$instance==null)
            self::$instance = new MysqlDatabase();
        return self::$instance;

    }

    public function useDatabase($default=null)
    {
        if($default==null){
            $default= self::$NAME;
        }

        $status= $this->query("use ".$default);
        return $this;

    }
}
