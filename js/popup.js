// updating mint text value
let mintText = document.getElementById("mints");
chrome.storage.sync.get({ savedMints: 0 }, function (result) {
  myMints = result.savedMints;
  mintText.textContent = "Mints: " + myMints;
});

// option button functionality
let optionsButton = document.getElementById("options-button");
optionsButton.addEventListener("click", function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("../html/options.html"));
  }
});

// start Pomodoro button
let workButton = document.getElementById("work-button");
workButton.addEventListener("click", function () {
  // send message to background?
  console.log("begin work session");
});
