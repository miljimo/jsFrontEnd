<?php
  namespace portal\registries;
  use portal\http\Request;


/**
  The base object for all system registry services
*/
  interface Registry{

  	   /*
         The function get the object with the given name from the register if exists
         @method 
         @param {string}$name the name of the register object used to added
         @param {mixtype} $default  the value to return if the object $name is not found.
       */
       public function get($name, $default=null);
        /*
         The function register with the given name and value
         @method 
         @param {string}$name the name of the object to registered
         @param {mixtype} $value  the value of the object to register or map to the name
       */

       public function register($name, $mixvalue);
        /*
         The function return the number of register object found
         @method 
         @return {integer}
       */
       public function getCount();
        /*
        The function remove the object with the give name
         @method 
         @return {boolean} if success it return true else false;
       */
       public function remove($name);

   }
