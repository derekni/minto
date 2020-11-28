let blacklist = document.getElementById("blacklist");
let mintText = document.getElementById("mints");

chrome.storage.sync.get({ savedMints: 0 }, function (result) {
  myMints = result.savedMints;
  mintText.textContent = "Mints: " + myMints;
});

blacklist.addEventListener("click", function () {
  console.log("blacklist button clicked");
});

// going to options
let optionsButton = document.getElementById("options-button");
optionsButton.addEventListener("click", function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("../html/options.html"));
  }
});
