/**
 The file contains the file system class that contains information of the file.
 This parse the file name and gives its name, extension and directory.

*/
"use strict"

/**
it take a string name of a file and return all the descriptions belo
 @class
*/
 var FileInfo =(function(filename)
 {
   if(typeof filename!=='string')
   		throw new Error("@FileParser Requires a string name for the file");
   var lastIndexOfFolder =  filename.lastIndexOf('/');
   var fileName  =filename.substring(lastIndexOfFolder+1);
   var extension=fileName.substring(fileName.lastIndexOf('.')+1);
   var basename     = fileName.substring(0,fileName.lastIndexOf('.'));  
   var folder   = filename.substring(0,lastIndexOfFolder);
   Object.defineProperties(this, {"extension":{value:extension,writable:false,enumerable:false}});
   Object.defineProperties(this, {"basename":{value:basename,writable:false,enumerable:false}});
   Object.defineProperties(this, {"folder":{value:folder,writable:false,enumerable:false}});
   Object.defineProperties(this, {"filename":{value:fileName,writable:false,enumerable:false}});

 })
module.exports= FileInfo;

