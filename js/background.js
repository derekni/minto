var myMints = 0;
var decrementIntervalId;

// gets saved mints and starts updating
chrome.storage.sync.get({ savedMints: 0 }, function (result) {
  // myMints = 1;
  myMints = result.savedMints + 2500;
  decrementIntervalId = setInterval(function () {
    decrementMints();
  }, 6000);
});

// decrements mint value every 6 seconds (1/10 minute), redirects if necessary
function decrementMints() {
  if (myMints <= 1) {
    myMints = 0;
    blockAllSites();
    clearInterval(decrementIntervalId);
    updateMints(myMints, false);
  } else {
    myMints -= 1;
    updateMints(myMints, true);
  }
}

// update mints value to given parameter
function updateMints(mintValue, userHasMints) {
  chrome.storage.sync.set(
    { savedMints: mintValue, hasMints: userHasMints },
    function () {
      console.log("Mints saved as", mintValue);
      console.log(new Date());
    }
  );
}

// set has mint status to false, redirects pages
function blockAllSites() {
  chrome.storage.sync.set({ hasMints: false }, function () {
    console.log("Has mint status saved as", false);
    // query for active tab and redirect it
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTabId = tabs[0].id;
      chrome.tabs.sendMessage(
        activeTabId,
        { message: "check mints!" },
        function () {
          console.log("sent message to tab, ran out of mints", activeTabId);
        }
      );
    });
  });
}

// check for tab switches
chrome.tabs.onActivated.addListener(function (tab) {
  // sends message to switched tab
  let tabId = tab["tabId"];
  chrome.tabs.sendMessage(tabId, { message: "check mints!" }, function () {
    console.log("sent message to tab, switched tabs", tabId);
  });
});

// make badge appear when working
// chrome.browserAction.setBadgeText({text: 'ON'});
// chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
