<?php
/**
 The class validated all the fields on provided for 
*/
 namespace portal\helpers;
 use Symfony\Component\HttpFoundation\ParameterBag;

 class Validator{
    private $errorset=null;
    private $fieldset=null;

    function __construct(){
         $this->fieldset = new ParameterBag();
         $this->errorset = new ParameterBag();
     }

     /**
      The function add fields to validated and their roles 
     */

    function field($fieldname,$arrayset=[]){
       if(is_string($fieldname))
       {

          if(is_array($arrayset))
          {
             $fieldbag = $this->fieldset->get($fieldname,null);
             if(!$fieldbag)
                  $fieldbag = new ParameterBag();           
             foreach($arrayset as $key=>$array){                
                if(is_array($array)){                    
                    $fieldbag->set($key,$array);
                }
             }
            $this->fieldset->set($fieldname, $fieldbag);
          }
       }

       return $this;
   }
 
 /**
  The function accept multiple fields to validated
 */

   function fields($arraySet){
     if(is_array($arraySet)){

     foreach($arraySet  as $key=>$value){
        if(is_string($key) && is_array($value)){
            $this->field($key, $value);
        }
     }
    }
    return $this;
   }

/**
 The function iterate the fields sets
*/
 function traverse($name, $value, $callback)
 {
     if(!is_callable($callback)) return $this;
      $inter = $this->fieldset->getIterator();
      foreach($inter as $fieldname=>$fieldset){
         if($name !=$fieldname)continue;
         if(is_a($fieldset, ParameterBag::class)){
            $innerIterator  = $fieldset->getIterator();
            foreach($innerIterator as $type=>$criteria){
               if(is_array($criteria))
               {
                  $criteria["pattern"] = (isset($criteria["pattern"]) && is_string($criteria["pattern"]))?$criteria["pattern"]:"/(?:)/";
                  $criteria["require"] = (isset($criteria["require"]) && is_bool($criteria["require"]))?$criteria["require"]:true;
                  $criteria["positive"]= (isset($criteria["positive"]) && is_bool($criteria["positive"]))?$criteria["positive"]:true;
                  $criteria["error"]   = (isset($criteria["error"]) && is_string($criteria["error"]))?$criteria["error"]:"The field $fieldname $type  is invalid";
                  $criteria["test"]    = (isset($criteria["test"]) && is_callable($criteria["test"]))?$criteria["test"]:(function(){return true;});
                  $criteria["length"]  = strval($value);
                  $criteria["value"]   = $value;
                  call_user_func($callback, $fieldname,$type, $criteria );
               }
             
            }
         }

      }
  }



/**
 Generated and validated each field set criteria
*/


 function generate($name, $value){

       $this->traverse($name,$value,  (function($fieldname ,$type, $criteria){
           $ismatch  = $this->match($criteria["pattern"], $criteria["value"], $criteria["positive"]);
           if(!$ismatch){
                  if(boolval($criteria["require"])){
                    $this->errorset->set($fieldname, $criteria["error"]);
                  }
               }else{
                   if(!boolval(call_user_func($criteria["test"],$criteria["value"], strlen($criteria["value"])))){
                     $this->errorset->set($fieldname, $criteria["error"]);
                   }
           }
        }));
 }

 function match($pattern , $value, $doNotNegate=true){
    $isMatch = false;
    $doNotNegate  = (is_bool($doNotNegate))?$doNotNegate:true;
   if(is_string($pattern)){
       $test = boolval(preg_match($pattern, $value));
       if(!$doNotNegate){                
          $test  = !$test;
       }
      $isMatch =  $test;
   }
   return $isMatch;
 }


function errors($callback){
     
     $iter = $this->errorset->getIterator();
     foreach($iter as $fieldname=>$error){
      if(is_callable($callback)){
          call_user_func($callback,$fieldname, $error);
      }

     }
}

      //Take an imput and validated it with the previous given data
 function valid($arrayPairValues=[])
    {
        $this->errorset->removeAll();
         if(is_array($arrayPairValues)){
            foreach($arrayPairValues as $key=>$value){
                 if(is_string($value) && is_string($key)){
                    $this->generate($key , $value);
                 }
                   
            }

         }
    return ($this->errorset->count() ==0);     
   }
}
