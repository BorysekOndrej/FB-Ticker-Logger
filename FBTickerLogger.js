// ==UserScript==
// @name		Log the FB ticker to remote server
// @version		0.5
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
listLoaded = false;

function printDebugMSG(msg){
	if(settings.debug === true){ console.log(msg); }
}

function loadAlreadySaved(){
	printDebugMSG("sending request");
	GM_xmlhttpRequest({
		url: "https://scripts.borysek.eu/fbTickerLoad.php?load=true",
		method: "GET",
			onload: function(response) {
				var obj = JSON.parse(response.responseText);
				var aParsedID;
			for (var i = obj.length - 1; i >= 0; i--) {
				aParsedID = decodeURIComponent(obj[i]);
				alreadySavedID[i]=aParsedID;
				printDebugMSG("parsing");
			};
			listLoaded = true;
			}		
	});
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
	loadAlreadySaved();
	printDebugMSG("GM script started");
	setInterval(function(){
			main($);
	}, settings.interval);
});


function main($){
	printDebugMSG("main started");
	printDebugMSG(alreadySavedID.length);
	if($(".uiScrollableAreaContent") && listLoaded == true){
		$(".fbFeedTickerStory").each(function(i, obj){
			var	$obj = $(obj),
				objID = $obj.attr("id"),
				savedID = btoa(objID),
				$savedOnIndex = $.inArray(savedID, alreadySavedID);
				if ($savedOnIndex<0){
					savedObj = btoa($obj);
					alreadySavedID.push(savedID);
					postMyData(savedID, savedObj);
					printDebugMSG(savedID);		
				}
		});
		$(".pam.tickerMorePager.stat_elem").get(0).scrollIntoView();
	}
}
