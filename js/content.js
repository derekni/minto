const id = chrome.runtime.id;

// checks if user is allowed to access this site
function checkSite() {
  chrome.storage.sync.get({ isWorking: false }, function (result) {
    console.log(result.isWorking);
    if (result.isWorking) {
      blockSite();
    } else {
      checkMints();
    }
  });
}
checkSite();

// checks if current site is blocked, redirects if it is
function blockSite() {
  chrome.storage.sync.get({ sites: [] }, function (result) {
    const blockedSites = result.sites;
    const currentSite = window.location.toString();
    for (let i = 0; i < blockedSites.length; i++) {
      blockedSite = blockedSites[i];
      if (currentSite.includes(blockedSite)) {
        console.log("accessed a blocked site", blockedSite);
        window.location.href = `chrome-extension://${id}/html/blocked.html`;
      }
    }
  });
}

// checks if have mints, redirect if not
function checkMints() {
  chrome.storage.sync.get({ savedMints: 0 }, function (result) {
    const savedMints = result.savedMints;
    console.log("checking mints, current mints are", savedMints);
    if (savedMints === 0) {
      window.location.href = `chrome-extension://${id}/html/no-mints.html`;
    }
  });
}

// listens for messages about tab switches from background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "switched tabs") {
    console.log("switched tabs, rechecking from content.js");
    checkSite();
  }
  sendResponse(true);
});
