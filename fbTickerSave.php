<?php
	$mode = "save";
	include 'fbTickerSup.php';

	$datetime 		= date("Y-m-d H:i:s");
	$tickerID 		= $_POST["IDtoSave"];
	$tickerStory  	= base64_encode(urldecode($_POST["StoryToSave"]));
	$tickerName  	= $_POST["NameToSave"];

	$stmt = $connId->prepare("INSERT INTO $db_table (received, tickerID, tickerStory, tickerName) VALUES (?, ?, ?, ?)");
	$stmt->bind_param("ssss", $datetime, $tickerID, $tickerStory, $tickerName);
	$stmt->execute();

?>
