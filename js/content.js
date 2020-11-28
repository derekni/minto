var blockedSites = [];
var id = chrome.runtime.id;

// gets saved blocked sites
chrome.storage.sync.get({ sites: [] }, function (result) {
  blockedSites = result.sites;
  console.log("blocked sites", blockedSites);
  blockSite();
});

// checks if current site is blocked, redirects if it is
function blockSite() {
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
}
