// chrome.app.runtime.onLaunched.addListener(function () {
  // chrome.app.window.create("window.html", {
  //   id: "main-window",
  //   innerBounds: {width:600, height:400}
  // });
  // doNotify();
// });

let timer = 0;
let times = 0;

document.addEventListener('DOMContentLoaded', function(){
  var that = this;
  chrome.tabs.query({ active: true }, function(tab) {
  });

  chrome.tabs.onHighlighted.addListener((tab) => {
    chrome.tabs.get(tab.tabIds[0], (tab) => {
      doNotify(tab);
    });
  });
});

function doNotify(tab) {
  if(!isTabOnBlacklist(tab)) return;

	var path = chrome.runtime.getURL("images/middle-finger.png");
	var options = null;
	// var sBtn1 = document.getElementById("btn1").value;
	// var sBtn2 = document.getElementById("btn2").value;

	// Create the right notification for the selected type
	options = 	{
  		type : "progress",
  		title: "Procrastinator",
  		message: `Você ja entrou no facebook ${++times} vezes caralho, sai daqui mano, não tem mais o que fazer?`,
  		progress: timer
	};

  console.log(path);
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

	chrome.notifications.create("id", options, creationCallback);
}

function creationCallback(notID) {
    //setInterval(() => { ++timer }, 1000);
	setTimeout(function() {
		chrome.notifications.clear(notID, function(wasCleared) {});
        timer = 0;
	}, 5000);
}

function isTabOnBlacklist(tab) {
  let onBlacklist = RegExp('facebook').test(tab.url);
  if (!onBlacklist) return false;
  let logs = [];
  let log = {
    site: tab.url,
    datetime: (new Date().getTime())
  };

  chrome.storage.sync.get('logs', (obj) => {
    if(obj.logs != null && obj.logs.length > 0)
      logs = obj.logs;
    logs.push(log);
    chrome.storage.sync.set({ logs: logs }, () => {
      console.log('Log salvo');
    });
  });
  
  return onBlacklist;
}
