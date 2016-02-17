// ==UserScript==
// @name		Log the FB ticker to remote server
// @version		0.7
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
		"limitLoading": 5000,
		"load": true,
		"send": true,
	},

alreadySavedID = [];
listLoaded = false;

function printDebugMSG(msg){
	if(settings.debug === true){ console.log(msg); }
}

function loadAlreadySaved(){
	if(settings.load === false){
		listLoaded = true;
		printDebugMSG("list loading disabled");
		return true;
	}
	printDebugMSG("sending request");
	GM_xmlhttpRequest({
		url: "https://scripts.borysek.eu/fbTickerLoad.php",
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

function postMyData(IDtoSave, StoryToSave, NameToSave){
	if(settings.send === false){
		printDebugMSG("sending disabled");
		return true;
	}
	GM_xmlhttpRequest({
		url: "https://scripts.borysek.eu/fbTickerSave.php",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		method: "POST",
		data: "IDtoSave=" + encodeURIComponent (IDtoSave) 
				+ "&StoryToSave=" 	+ encodeURIComponent (StoryToSave)
				+ "&NameToSave=" 	+ encodeURIComponent (NameToSave),
		onload: function(response) {
			printDebugMSG(IDtoSave);
		}
	});
}


$(document).ready(function($) {
	loadAlreadySaved();
	printDebugMSG("GM script started");
	setInterval(function(){
			main($);
	}, settings.interval);
});


function main($){
//	printDebugMSG("main started");
	printDebugMSG(alreadySavedID.length);
	if (alreadySavedID.length < settings.limitLoading){
		printDebugMSG("proceding");
		if($(".uiScrollableAreaContent") && listLoaded == true){
			$(".fbFeedTickerStory").each(function(i, obj){
				var	$obj = $(obj),
					objID = $obj.attr("id"),
					savedID = btoa(objID),
					savedOnIndex = $.inArray(savedID, alreadySavedID);
				if (savedOnIndex<0){
					savedObj = $obj[0].outerHTML;
					parsedName = $obj.find(".fwb").text();
					alreadySavedID.push(savedID);
					postMyData(savedID, savedObj, parsedName);
				}
			});
			$(".pam.tickerMorePager.stat_elem").get(0).scrollIntoView();
		}		
	}else{
		printDebugMSG("not proceding");
	}
}
