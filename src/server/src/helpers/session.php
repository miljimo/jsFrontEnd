<?php
/**
 This is a static class object that keep track of the session and destroy of php session
*/
namespace portal\helpers;

class Session {
    public static function init() {
        session_start();
    }
    public static function restart() {
        session_reset();
    }
    public static function set($key, $value) {
        $_SESSION[$key] = $value;
    }
    public static function get($key) {
        if (isset($_SESSION[$key])) {
            return $_SESSION[$key];
        }
        return "";
    }
    public static function destroy() {
        session_destroy();
    }
    public static function delete($key) {
        if (isset($_SESSION[$key])) {
            unset($_SESSION[$key]);
        }
    }
    public static function getId() {
        return session_id();
    }
}
