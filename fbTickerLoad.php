<?php
	$mode = "load";
	include 'fbTickerSup.php';

	$query = "SELECT DISTINCT `tickerID` FROM `FBticker`";
	$result = mysqli_query($connId, $query);
	$savedIDs = array();
	while($row = $result->fetch_row()){
		$parsedID = $row[0];
		array_push($savedIDs, $parsedID);
	}
	$toPrint = json_encode($savedIDs);
	echo $toPrint;
?>
