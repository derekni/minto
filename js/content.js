var id = chrome.runtime.id;
var working = false;

checkStatus();

// checks if website should be blocked or not
// based on if user is working, or if user has mints
function checkStatus() {
  chrome.storage.sync.get({ isWorking: false }, function (result) {
    working = result.isWorking;
    console.log("working status", working);
    if (working) {
      blockSite();
    } else {
      checkMints();
      setInterval(checkMints(), 6000);
    }
  });
}

// checks if current site is blocked, redirects if it is
function blockSite() {
  chrome.storage.sync.get({ sites: [] }, function (result) {
    let blockedSites = result.sites;
    var currentSite = window.location.toString();
    for (var i = 0; i < blockedSites.length; i++) {
      blockedSite = blockedSites[i];
      if (currentSite.includes(blockedSite)) {
        console.log("accessed a blocked site", blockedSite);
        // location.replace('http://example.com')

        // this requires document_idle, changes HTML on page
        // document.documentElement.innerHTML = "";
        // document.documentElement.innerHTML = "You shouldn't be here >:(";
        // document.documentElement.scrollTop = 0;

        // this redirects to blocked.html, can use document_start
        window.location.href = `chrome-extension://${id}/html/blocked.html`;
      }
    }
  });
}

// checks if have mints, redirect if not
function checkMints() {
  chrome.storage.sync.get({ hasMints: true }, function (result) {
    console.log(result.hasMints);
    let hasMints = result.hasMints;
    if (!hasMints) {
      window.location.href = `chrome-extension://${id}/html/no-mints.html`;
    }
  });
}

// listens for messages about tab switches
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === "check mints!") {
    console.log("check for mints!"); // switched tabs
    checkStatus();
  }
  sendResponse(true);
});
