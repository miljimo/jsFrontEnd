
<?php 

$autoloader = require __DIR__ . '/src/helpers/helper.php';
$autoloader = require __DIR__ . '/src/databases/MysqlDatabase.php';
use portal\databases\MysqlDatabase as Database;


/**

The database table for the service registration before client can access it.
@author obaro
*/
$db = new Database();
$db->useDatabase();
$db->createField("col_uid","varchar(50)","not null  Primary Key");
$db->createField("col_module","varchar(50)"," NOT NULL");
$db->createField("col_description","varchar(50)", "");
$db->createField("col_lastUpdate","varchar(50)");
$db->createField("col_createDate","varchar(50)");
$db->createTable("tbl_client_service");
$db=null;


//Database configurations
/**
Supported devices table for the database application
*/

$db = new Database();
$db->useDatabase();
$db->createField("col_name","varchar(50)","primary key");
$db->createField("col_genericType","varchar(100)","not null");
$db->createField("col_scriptUrl","varchar(100)","not null");
$db->createField("col_defaultPage","varchar(100)","default null");
$db->createField("col_minVersion","varchar(100)","not null");
$db->createField("col_maxVersion","varchar(100)","not null");
$db->createField("col_status","int","default 0");
$db->createField("col_registeredDate");
$db->createField("col_lastUpdateDate");
$db->createTable("tbl_device");
$db = null;

 /**
  The screen create the client table
  @table tbl_client_registration
 */
$db = new Database();
$db->useDatabase();
$db->createField("col_broswer","varchar(50)","not null");
$db->createField("col_ipaddress","varchar(50)","not null");
$db->createField("col_macAddress","varchar(50)", "");
$db->createField("col_location","varchar(50)");
$db->createField("col_defaultPage");
$db->createField("col_os");
$db->createField("col_softwareVersion","varchar(50)");
$db->createField("col_hardwareVersion","varchar(50)");
$db->createField("col_clientId","int","primary key");
$db->createField("col_status","int");
$db->createField("col_registered_date");
$db->createField("col_last_access_date");
$db->createTable("tbl_client");
$db=null;


 /**
 Database table to keep track of the last pages view by the client session to be able to retain it when the client refresh its local client page
 @table tbl_client_registration
 */
$db = new Database();
$db->useDatabase();
$db->createField("col_client_ipAddress","varchar(50)","not null  Primary Key");
$db->createField("col_client_sessionId","varchar(50)"," NOT NULL");
$db->createField("col_client_currentPage","varchar(50)", "");
$db->createField("col_lastUpdate","varchar(50)");
$db->createField("col_createDate");
$db->createTable("tbl_client_page_session");
$db=null;


/**
 Create client user database table
*/

$db = new Database();
$db->useDatabase();
$db->createField("col_uid","varchar(50)","not null  Primary Key");
$db->createField("col_firstname","varchar(50)"," NOT NULL");
$db->createField("col_lastname","varchar(50)", "");
$db->createField("col_email","varchar(50)");
$db->createField("col_username","varchar(50)");
$db->createField("col_password","varchar(50)");
$db->createField("col_date_created");
$db->createField("col_last_update");
$db->createTable("tbl_client_user");
$db=null;

/**
 Create client activated account tbl records
*/

$db = new Database();
$db->useDatabase();
$db->createField("col_username","varchar(50)","not null  Primary Key");
$db->createField("col_reason","text"," NOT NULL");
$db->createField("col_activator","varchar(50)", "");
$db->createField("col_last_date_updated","varchar(50)");
$db->createField("col_status","int", "default 0");
$db->createField("col_date_created","varchar(50)");
$db->createField("col_ipaddress", "varchar(50)", "default null");
$db->createTable("tbl_account_activated");
$db=null;

/**
 Create user number of attempts recording tbl and platform informations
*/

$db = new Database();
$db->useDatabase();
$db->createField("col_username","varchar(50)","not null  Primary Key");
$db->createField("col_session_id","varchar(50)"," NOT NULL");
$db->createField("col_ipAddress","varchar(50)", " not null");
$db->createField("col_attempt","int", "default  0");
$db->createField("col_attempt_date","varchar(50)","not null");
$db->createField("col_create_date","varchar(50)", "not null");
$db->createTable("tbl_login_attempt");
$db=null;


