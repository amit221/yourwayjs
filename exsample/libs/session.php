<?php
session_start();

function dbgout($msg)
{
	//echo $msg;
}
function encrypt($text, $salt = SALT_KEY)
{
	return trim(base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $salt, $text, MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND))));
}

function decrypt($text, $salt = SALT_KEY)
{
	return trim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $salt, base64_decode($text), MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND)));
}

define("SW", md5('om2gf4dj8g'));
define("SALT_KEY_SESSION", "n2Hdj84tDHDl4rfjOPtfJH");
/* define DBG_SESSION for session debuging */
//define( 'DBG_SESSION', '' );

class Session
{
	public $name;

	function __construct($name)
	{
		$this->name = md5($name);
		if( defined('DBG_SESSION') )
		{
			dbgout("init session name $name, decoded name: {$this->name}");
		}
	}
	function __destruct()
	{
	}
	function destroy()
	{
		if( defined('DBG_SESSION') )
		{
			dbgout("unset decoded name: {$this->name}");
		}

		unset($_SESSION[$this->name]);
	}

	function storeSession($obj)
	{
		/* store session */
		//here("sotre");
		session_regenerate_id();
			
		$session['rnd'] = md5(rand(-32000, -1)); /* just to mess with people that tring to decrypt the session */
		$session['obj'] = $obj;
		$session['ip'] = $_SERVER['REMOTE_ADDR'];
		$session['time'] = time();
		$session['rnd2'] = md5(rand(0, 64000)); /* just to mess with people that tring to decrypt the session */
		$session['sw'] = SW; /* secret word ... shhhh */

		$_SESSION[$this->name] = encrypt( json_encode($session), SALT_KEY_SESSION );
		//$_SESSION['data1'] = encrypt( self::$accounts );

		//Write session to disc
		//session_write_close();
		if( defined('DBG_SESSION') )
		{
			dbgout("store decoded name: {$this->name} data:".json_encode($session));
		}
		/* store session on mysql */
		/* TBD */
	}

	function readSession()
	{
		//here($_SESSION[$this->name]);
		if( defined('DBG_SESSION') )
		{
			dbgout("read decoded name: {$this->name}");
		}
		if( empty($_SESSION[$this->name]) )
		{
			//dbgout("empty session: " . $this->name );
			return false;
		}
		$s = json_decode(decrypt($_SESSION[$this->name], SALT_KEY_SESSION));
		//here($s);
		if( $s->sw == SW && $s->ip == $_SERVER['REMOTE_ADDR'] )
		{
			if( defined('DBG_SESSION') )
			{
				dbgout("read session: {$s->obj}");
			}
			return $s->obj;
		}
		return false;
	}
}
?>