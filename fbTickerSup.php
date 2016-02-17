<?php
function homeIP(){
	$myIP = "1.2.3.4"; // not really but, I kinda don't wanna publish test with my IP
	if ($_SERVER['REMOTE_ADDR'] == $myIP ){ 
		return true;
	}
/*	if ($_SERVER['HTTP_X_FORWARDED_FOR']== $myIP){ // bypass for cloudflare, but dangerous - another solution
		return true;
	}
*/
	return false;
}


if (!homeIP())
	die("disabled 1");

if ($mode!="save" && $mode!="access" && $mode!="load"){
	die("disabled 2");
}

if (homeIP()){
	$amIDebuging = true;
	if ($amIDebuging){
		ini_set("display_errors", 1);
		error_reporting(E_ALL);    
	}
}


	$db_server	 = "";
	$db_username = "";
	$db_password = "";
	$db_database = "";
	$db_table	 = "";

	$connId = mysqli_connect($db_server,$db_username,$db_password) or die("Internal Error 1");
	$selectDb = mysqli_select_db($connId, $db_database) or die("Internal Error 2");
	mysqli_set_charset($connId, "utf8");

	
	if ($mode=="access"){
		echo '
		<style type="text/css">
		  .tickerStoryImage {
		    display: none;
		  }
		</style>
		';
	}
	


 function cleanupString ($storyBodyOrig){
    $searchOfset = strpos($storyBodyOrig, 'https');
    $storyBody = substr($storyBodyOrig, 0, $searchOfset);
    $storyBody .= 'https://blank.borysek.eu';
    $storyBody .= substr($storyBodyOrig, strpos($storyBodyOrig, '"', $searchOfset));

    $storyBody = str_replace("fbcdn.net", "blank.borysek.eu", $storyBody); //previous rule does not catch few special cases, so this saves it, although every modified request will be unique
    return $storyBody;
}


