<?php

// The file allow user to add more services object to the portal services 

use portal\registries\ServiceRegistry as Registry;

/**
@author Obaro
The service is used to initialised the client devices and get the platform informations;
*/
Registry::addService("portalInitializer", "portal\services\InitialisePortalService");

/**
The service register the current client information guess or not guess clients with unique ipaddress
*/

Registry::addService("registerClientService","portal\services\RegisterClientService");

/**
The services update the current client client page to the new change page.
 
*/
 Registry::addService("updateSessionPageService","portal\services\UpdateSessionPageService");



/**
@description
The service register a new Client User information details
*/
 Registry::addService("registerUserService", "portal\services\users\RegisterUserService");

 /**
 @descriptions
  The service is used to authenticated the client user before they can access their account page.
    @author obaro 
 */

Registry::addService("authoUserLoginService", "portal\services\users\UserAuthenticationService");













