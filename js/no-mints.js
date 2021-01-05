var workButton = document.getElementById("work-button");

workButton.addEventListener("click", function () {
  chrome.runtime.sendMessage({ greeting: "begin work for 25" });
  history.back();
});
