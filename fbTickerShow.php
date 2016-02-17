<?php
  $mode = "access";
  include 'fbTickerSup.php';

  $query = "SELECT * FROM `FBticker` GROUP BY `tickerID` ORDER BY `received` DESC LIMIT 5000";
  $result = mysqli_query($connId, $query);
  while($row = mysqli_fetch_assoc($result)){
    $storyBodyOrig = base64_decode($row["tickerStory"]);
    $storyBody = cleanupString($storyBodyOrig);

    $storyBodyExploded = explode(',', $storyBody);
    foreach ($storyBodyExploded as $key => $value) {
      /* EDIT DIFFERENT TYPES OF STORIES */
      echo $value;
    }
  }
?>
