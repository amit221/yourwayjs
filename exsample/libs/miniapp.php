
<?php if (!defined('BASE_URL')) exit('you are not allowd to get to this file manuly');


class Miniapp
{
	private $page = "";
	private $segments =  ""; 
	private $errors = array();

	function __construct()
	{
		$clean_url = str_replace(BASE_URL, "", FULL_URL);
		$clean_url = str_replace("index.php/", "", $clean_url);
		$temp = substr($clean_url ,0 , strpos($clean_url, "?"));
		$this->page = $temp != "" ? $temp : $clean_url ;
		$this->page = str_replace("//", "/", $this->page);
		$this->segments = explode("/", $this->page);
		$this->page = strpos($this->segments[0], "?") === 0 ? "" : trim($this->segments[0]);
		if(isset($_REQUEST['ajax_req']) && $_REQUEST['ajax_req'] == "yourwayjs" )
		{
			
			$this->mainApp();
		}
		else 
		{
			echo file_get_contents(PATH."/views/skin.html");
		}


	}
	
	function mainApp()
	{
		
		
		switch ($this->page)
		{
			case 'server_page':
			case '' :
				{
					
					echo file_get_contents(PATH."/views/home.html");
					break;
					
				}
			

			case 'working_with_json':
				{
				
					$json = new stdClass();
					
					$json->title1 = "dummy";
					$json->title2 = "dummy";
					$json->f1 = "dummy";
					$json->f2 = "dummy";
					$json->f3 = "dummy";
					$json->f4 = "dummy";
					$json->f5 = "dummy";
					$json->f6 = "dummy";
					$json->dummy1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
					
					header("Content-Type: application/json", true);
					echo json_encode($json);
					break;
				}
			case 'form' :
			{
			
				echo $this->renderView("form",true);
			
				break;
			}
			
		
			
			default:
			{
				//$this->renderView('404_error');
				
				header("HTTP/1.0 404 Not Found");
				echo '<img style="width: 100%;position: absolute;left: 0;top: 95px;"  src="'.BASE_URL.'img/404/404_12.jpg"  />' ;
				die();
			}
			
		}
	}


	function loadLib($name)
	{
		require_once PATH."/libs/".$name.".php";
	}

	function renderView($name , $return = false , $arr = array())
	{
		if(!empty($arr) )
		{
			extract($arr);
			
		}
		if ($return)
		{
			ob_start();
			require_once PATH."/views/".$name.".php";
			return ob_get_clean();
		}
		$content = $this->renderView($name,true,$arr);
		require_once PATH."/views/skin.php";
		
	}
	
	function getPage()
	{
		return $this->page;
	}
	
	function getSegment()
	{
		return $this->segments;
	}
	

	
	
}