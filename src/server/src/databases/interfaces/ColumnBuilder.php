<?php
 
 /**
 The interface class is the base class for all all database table column object creations
 @author Obaro I. Johnson
 @license MIT

 */
   namespace portal\databases\interfaces;
   use portal\services\interfaces\Builder as IBuilder;

   

   interface  ColumnBuilder  extends IBuilder
    {
      
       /**
         set the table size for the column
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function size(int $size);
       /**
         Set the table to be primary key
         @method  primary key
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function primary($name);
       /**
         Set the table to be a foriegn in different table 
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function foriegn($for_tablename, $column_name);
       /**
         Set the column to be an index table
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function index();
       /**
         Set the table column constraints 
         @method constraints
         @param {string} $constraints  values to be set 
         @return {BluePrint} return itself
      */
      public function constraints(string $constraits);
       /**
         Create a integer column with the give name
         @method  fulltext 
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function fulltext(abool);
       /**
         Create a integer column with the give name
         @method integer
         @param {string} $col_name the name of the column
         @return {BluePrint} return itself
      */
      public function build();

    
    }