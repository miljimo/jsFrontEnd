<?php
    namespace portal\http;
    use Symfony\Component\HttpFoundation\Response as SynfonyRespone;



   class Response extends SynfonyRespone
   {

      private $__response ;
    /**
    Initialise the base class Response object
    */
       public function __construct($content = "", $status = 200, $headers = array()){
       		parent::__construct($content ,$status,$headers, true);
          $this->setCharset('ISO-8859-1');
          $this->headers->set('Content-Type', 'application/json');         
          $this->__response = array();
          $this->headers->set("Access-Control-Allow-Origin","*");
          $this->headers->set("Access-Control-Allow-Methods", "HEAD, GET, POST");
          $this->headers->set("Access-Control-Allow-Headers","context-type, Authorization, X-Requested-With");

       }


       public function addParameter($name, $value){
         if(is_string($name)){
             $this->__response[$name] = $value;
         }
       }


       public function removeParameter($name){
         if(isset($this->__response[$name])){
             unset($this->__response[$name]);
         }
       }

       public function getParameter($name){
           if(is_string($name))
              return $this->__response[$name];
          return null;
       }

      public function setContent($content){
        $this->__response["response"]= $content;
        return $this;
      }
      /**
      @send the content value
      */
      public function send(){
        $stringContent  = json_encode($this->__response);        
        parent::setContent($stringContent);
        parent::send();
       }

   }

