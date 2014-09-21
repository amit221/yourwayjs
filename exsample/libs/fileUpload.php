<?php if (!defined('BASE_URL')) exit('you are not allowd to get to this file manuly');

class Fileupload
{
	private $mimes = array("application/x-aportisdoc" =>  "pdb" ,'chemical/x-pdb' => "pdb",'text/plain' => "txt","application/plain" => "text");

	
	public function uploadFile($file,$filed,$run_id,$max_size,$type)
	{
		$temp = explode(".", $file["name"]);
		$extension = end($temp);
		
		if ($file["error"]  !=  UPLOAD_ERR_OK) {
				
			return $this->codeToMessage($file["error"]);
		}
		if ($max_size < ($file["size"] / 1024))
		{
			return "the file {$file["name"]} is to big. the max size is ".($max_size / 1024)."MB";
		}
		if($type != $extension || !in_array($extension, $this->mimes))
		{
			return "file type {$extension} does not supported ";
		}
		array_flip($this->mimes);
		
		if (!in_array($file['type'], array_keys($this->mimes) ) )
		{
			return "file type {$extension} does not supported ";
		}
		
	
		
		$path = UPLOAD_PATH.$run_id."/uploads/";
		$name = $file['name'];
		$actual_name = pathinfo($name,PATHINFO_FILENAME);
		$original_name = $actual_name;
		$extension = pathinfo($name, PATHINFO_EXTENSION);
		
		$i = 1;
		while(file_exists($path.$actual_name.".".$extension))
		{           
		    $actual_name = (string)$original_name.$i;
		    $name = $actual_name.".".$extension;
		    $i++;
		}
		
		move_uploaded_file($file["tmp_name"],$path.$name);
		return array($name);
		
	}
	
	private function codeToMessage($code) 
    { 
        switch ($code) { 
            case UPLOAD_ERR_INI_SIZE: 
                $message = "The uploaded file exceeds the upload_max_filesize directive in php.ini";
                break; 
            case UPLOAD_ERR_FORM_SIZE: 
                $message = "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form"; 
                break; 
            case UPLOAD_ERR_PARTIAL: 
                $message = "The uploaded file was only partially uploaded"; 
                break; 
            case UPLOAD_ERR_NO_FILE: 
                $message = "No file was uploaded"; 
                break; 
            case UPLOAD_ERR_NO_TMP_DIR: 
                $message = "Missing a temporary folder"; 
                break; 
            case UPLOAD_ERR_CANT_WRITE: 
                $message = "Failed to write file to disk"; 
                break; 
            case UPLOAD_ERR_EXTENSION: 
                $message = "File upload stopped by extension"; 
                break; 

            default: 
                $message = "Unknown upload error"; 
                break; 
        } 
        return $message; 
    } 
	
}