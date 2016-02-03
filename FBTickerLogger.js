// ==UserScript==
// @name		Log the FB ticker to remote server
// @version		0.3
// @description	Scripts logs the FB ticker to remote server
// @include		https://www.facebook.com/
// @exclude		https://www.facebook.com/plugins/*
// @grant		GM_getValue
// @grant		GM_xmlhttpRequest
// @author		Ondrej Borysek
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js
// @icon		https://scripts.borysek.eu/fbTickerLogo.png
// ==/UserScript==
var	settings = {
		"debug": true,
		"interval": 8000,
	},

alreadySavedID = [];

function printDebugMSG(msg){
	if(settings.debug === true){ console.log(msg); }
}

function postMyData(IDtoSave, StoryToSave){
	GM_xmlhttpRequest({
	url: "https://scripts.borysek.eu/fbTicker.php",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	method: "POST",
	data: "IDtoSave=" + encodeURIComponent (IDtoSave) 
			+ "&StoryToSave=" + encodeURIComponent (StoryToSave)	   
	});
	printDebugMSG(IDtoSave);
}


$(document).ready(function($) {
	printDebugMSG("GM script started");
	setInterval(function(){
			main($);
	}, settings.interval);
});


function main($){
	printDebugMSG("main started");
	printDebugMSG(alreadySavedID.length);
	if($(".uiScrollableAreaContent")){
		$(".fbFeedTickerStory").each(function(i, obj){
			var	$obj = $(obj),
				objID = $obj.attr("id"),
				savedID = btoa(objID),
				$savedOnIndex = $.inArray(savedID, alreadySavedID);
				if ($savedOnIndex<0){
					savedObj = btoa($obj);
					alreadySavedID.push(savedID);
					postMyData(savedID, alreadySavedID);
					printDebugMSG(savedID);		
				}
		});
		$(".pam.tickerMorePager.stat_elem").get(0).scrollIntoView();
	}
}
