<?php
$amIDebuging = false;
$allowedIP 	 = "1.2.3.4";
$db_server	 = "";
$db_username = "";
$db_password = "";
$db_database = "";
$db_table	 = "";

include 'privateConfig.php';
//echo $_SERVER['REMOTE_ADDR']."<br>".$allowedIP."<br>";

function homeIP(){
	global $allowedIP;
	if ($_SERVER['REMOTE_ADDR'] == $allowedIP ){ 
		return true;
	}
	return false;
}


if (!homeIP()){
	die("disabled 1");
}

if ($mode!="save" && $mode!="access" && $mode!="load"){
	die("disabled 2");
}

if (homeIP()){
	if ($amIDebuging){
		ini_set("display_errors", 1);
		error_reporting(E_ALL);    
	}
}


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
	


 function cleanupString ($storyBody){
	$shortString = '';
	$offset = 0;
	$startText = strpos($storyBody, '<div class="tickerFeedMessage">', $offset);
	while ( $startText > 0) {
	    $endText = strpos($storyBody, '</div>', $startText);
	    $offset = $endText+6;
        $shortString .= substr($storyBody, $startText, $offset-$startText);
        $shortString .= "\n";
        $startText = strpos($storyBody, '<div class="tickerFeedMessage">', $offset);
	}

    $shortString = str_replace("fbcdn.net", "blank.borysek.eu", $shortString);

	return $shortString;
}
