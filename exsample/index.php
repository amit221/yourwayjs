<?php 

/* config constans*/
define('ENVIRONMENT', 'development');
define('BASE_URL', "http://localhost/yourwayjs/exsample/");
define('FULL_URL', "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
define('PATH' ,__DIR__);
define("UPLOAD_PATH", PATH."/cards/");
define("IMAGE_PATH", PATH."/images/");

/*error reporting*/
if (defined('ENVIRONMENT'))
{
	switch (ENVIRONMENT)
	{
		case 'development':
			error_reporting(E_ALL);
			break;

		case 'testing':
		case 'production':
			error_reporting(0);
			break;

		default:
			exit('The application environment is not set correctly.');
	}
}

require_once PATH.'/libs/miniapp.php';
$miniapp = new Miniapp();

?>