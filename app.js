
const FIVE_MIN = 300000;
const ONE_MIN = 60000;
const TEST_MIN = 60000;

let temp = 0;
let times = 0;
let blocked = false;
let timerId;
let timer = 0;
let tempoLimite = TEST_MIN;

document.addEventListener('DOMContentLoaded', function(){
  var that = this;
  chrome.tabs.query({ active: true }, function(tab) {
  });

  chrome.tabs.onUpdated.addListener((tab, info) => {
    if(blocked && isTabOnBlacklist(info))
      chrome.tabs.update(tab, {url: chrome.runtime.getURL('blocked.html') });
  });
  chrome.tabs.onActivated.addListener((tab) => {
    chrome.tabs.get(tab.tabId, (tab) => {
      doNotify(tab);
    });
  });

});

function doNotify(tab) {
  if(!isTabOnBlacklist(tab)){
    stopTimer();
    return;
  } 

  runTimer();

	var path = chrome.runtime.getURL("images/clock-plus.png");
	var options = null;
	// var sBtn1 = document.getElementById("btn1").value;
	// var sBtn2 = document.getElementById("btn2").value;

  temp = Math.round((timer*100) / tempoLimite);

	// Create the right notification for the selected type
	options = 	{
  		type : "progress",
  		title: "Procrastinator",
  		message: `Você ja entrou no facebook ${++times} vezes caralho, sai daqui mano, não tem mais o que fazer?`,
  		progress: temp
	};

	options.iconUrl = path;
	// priority is from -2 to 2. The API makes no guarantee about how notifications are
	// visually handled by the OS - they simply represent hints that the OS can use to
	// order or display them however it wishes.
	options.priority = 0;

	options.buttons = [];
	// if (sBtn1.length)
	// 	options.buttons.push({ title: sBtn1 });
	// if (sBtn2.length)
	// 	options.buttons.push({ title: sBtn2 });

  if(temp >= 100){
    chrome.tabs.update(tab.id, {url: chrome.runtime.getURL('blocked.html') });
    blocked = true;
    stopTimer();
  } else
    chrome.notifications.create("id", options, creationCallback);
}

function creationCallback(notID) {
	setTimeout(function() {
		chrome.notifications.clear(notID, function(wasCleared) {});
	}, 5000);
}

function isTabOnBlacklist(tab) {
  let onBlacklist = RegExp('facebook.com').test(tab.url);
  return onBlacklist;
  //let logs = [];
  //let log = {
  //  site: tab.url,
  //  datetime: (new Date().getTime())
  //};

  //chrome.storage.sync.get('logs', (obj) => {
  //  if(obj.logs != null && obj.logs.length > 0)
  //    logs = obj.logs;
  //  logs.push(log);
  //  chrome.storage.sync.set({ logs: logs }, () => {
  //    console.log('Log salvo');
  //  });
  //});
}

function stopTimer(){
  window.clearInterval(timerId);
}

function runTimer(){
  timerId = setInterval(() => {
    timer += 100;
    //console.log(timer);
    //if(temp >= 90) {
    //  options = 	{
    //    type : "progress",
    //    title: "Procrastinator",
    //    message: `Você entrou ${++times} - Seu tempo terminou!!`,
    //    progress: temp
    //  };
    //  chrome.notifications.create("id", options, creationCallback);
    //}
  }, 100);
}
