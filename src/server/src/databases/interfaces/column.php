<?php
    
    namespace portal\databases\interface;

     abstract class Column
     {
       

      public function __construct($tablename){


      }
       /**
         store the size of the column 
         @type integer
         @
       */
     	final private $size          = 50;
     	final private $index         = false;
     	final private $unique        = false;
     	final private $primary       = false;
     	final private $constraints   = null;
     	final private $foreign       = null;
     	final private $foriegn_table = null;
     	final private $fulltext      = false;
     	final private $type          = "varchar";





     	public function builder(Blueprint $tablename){
           return new ColumnBuilder(this);
     	}     	
     }
   