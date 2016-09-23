<?php
  namespace portal\http;
    use Symfony\Component\HttpFoundation\Request as SynfonyRequest;
    use Symfony\Component\HttpFoundation\Respone as SynfonyRespone;



   class Request extends SynfonyRequest
   {
       public function __construct(){
       		parent::__construct($_GET,
							    $_POST,
							    array(),
							    $_COOKIE,
							    $_FILES,
							    $_SERVER);

       }


       public function get($name, $default=""){
          if($this->query->has($name))
               return $this->query->get($name,$default);
           return $this->request->get($name,$default);
       }

      /**
        A function that allow your to validate your services request before even passing it to your service object;

        @method

      */

        public function validate(){
            return true;
        }
   }

