<?php
use portal\Kernal;



/**
  @Description 
   The file contains all the client the portal engine can support and their client information.
   This will be run only on development platforms
*/

Kernal::registerDevice(["name"=>"portal",
	                    "minversion"=>"",
	                    "maxVersion"=>"",
	                    "clientScript"=>"PortalClient",
	                    "defaultPage"=>"index",
	                    "clientTypes"=>["chrome,firefox","safari","Internet Explorer"]	                
	                    ]);
                      
