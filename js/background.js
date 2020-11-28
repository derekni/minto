console.log("hi from background.js");
var myMints = 0;

// gets saved time and starts updating
chrome.storage.sync.get({ savedMints: 0 }, function (result) {
  myMints = result.savedMints;
  setInterval(function () {
    updateMints();
  }, 6000);
});

// updates mint value every 6 seconds (1/10 minute)
function updateMints() {
  if (myMints === 0) {
    blockAllSites();
  } else {
    myMints -= 1;
    chrome.storage.sync.set({ savedMints: myMints }, function () {
      console.log("Mints saved as", myMints);
    });
  }
  console.log(myMints);
}

// redirect to a site for running out of mints
function blockAllSites() {
  console.log("redirect to a site, out of mints");
}

// first time installation stuff here
// chrome.runtime.onInstalled.addListener(function () {
//   chrome.contextMenus.create({
//     id: "sampleContextMenu",
//     title: "Sample Context Menu",
//     contexts: ["selection"],
//   });
// });

// TO ADD LISTENER
// This will run when a bookmark is created.
// chrome.bookmarks.onCreated.addListener(function() {
//   // do something
// });

// make badge appear when working
// chrome.browserAction.setBadgeText({text: 'ON'});
// chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});

// to run something on page
// chrome.runtime.onMessage.addListener(
//   function(message, callback) {
//     if (message == “runContentScript”){
//       chrome.tabs.executeScript({
//         file: 'contentScript.js'
//       });
//     }
//  });
