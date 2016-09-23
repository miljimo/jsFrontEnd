<?php
/**
 The base   database table blueprint
*/
     namespace portal\databases\interfaces;

     interface BluePrint
     {

      /**
         Create a string column with the give name
         @method string
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function string(string $col_name);
      /**
         Create a integer column with the give name
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */

      public function integer(string $col_name);
      /**
         Create a double column with the give name
         @method double
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */

      public function double(string $col_name);
      /**
         Create a boolean column with the give name
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function boolean(string $col_name);
      /**
         Create a blob column with the give name
         @method blob
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function blob();
      /**
         Create a blod column with the give name
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function size($size);
      /**
         Create a size column with the give name
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function timespam();
      /**
         Create a integer column with the give name
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function primary(string columns);
      /**
         Create a integer column with the give name
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function primarys($array=[]);
      /**
         Create a integer column with the give name
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function foriegn($table, $foriegn_col_name);
      /**
         Create a integer column with the give name
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function map($col_name);#

      /**
         Create a integer column with the give name
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */

      public function alter($col_name, $new_column);
      /**
         drop the give column  name  from the database table if exists
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
       public function remove($col_name);
      
      /**
         Create a integer column with the give name
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */


        public function build();
     }
