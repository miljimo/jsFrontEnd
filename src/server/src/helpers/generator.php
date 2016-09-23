<?php
namespace portal\helpers;

class Generator{

   public  static function get($length = 10) {
        $result = '';
        $data = '';
        for ($i = 0; $i < $length; $i++) {
            $case = mt_rand(0, 1);
            switch ($case) {
                case 0:
                    $data = mt_rand(0, 9);
                    break;
                case 1:
                    $alpha = range('a', 'z');
                    $item = mt_rand(0, 25);
                    $data = strtoupper($alpha[$item]);
                    break;
            }
            $result .= $data;
        }
        return $result;
    }
}