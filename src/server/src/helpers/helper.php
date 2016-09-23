<?php
 namespace portal\helpers;

class Helper{


	public static function isWord($word) {
        $pattern = "/^[a-zA-Z\_]+[ a-zA-Z0-9\.\_]+$/";
        if (preg_match($pattern, trim($word))) {
            return true;
        }
        return false;
    }




}
