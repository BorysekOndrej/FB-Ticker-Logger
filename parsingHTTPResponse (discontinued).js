var file = document.body.firstChild.textContent; //parsing opened file in chrome
var toParse = file.substring(9);
var fbTicker = JSON.parse(toParse);
var tickerString = fbTicker.jsmods.markup[0][1].__html
document.body.innerHTML = tickerString
var moreLink = document.getElementsByClassName("uiMorePagerPrimary")[0].getAttribute("ajaxify");
