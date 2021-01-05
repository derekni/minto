let myMints = null;
let countdownId = null;
let timeLeft = null;
const countdownText = document.getElementById("countdown");

/** header */

// mint text value
const mintText = document.getElementById("mint-text");
function updateMintText(mints) {
  mintText.textContent = "" + Math.ceil(mints / 10);
}

// options button
const optionsButton = document.getElementById("options-button");
optionsButton.addEventListener("click", () => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("/html/options.html"));
  }
});

// refreshes header
function refreshHeader() {
  chrome.storage.sync.get({ savedMints: 0 }, (result) => {
    myMints = result.savedMints;
    updateMintText(myMints);
    console.log("updated to", myMints);
  });
}
refreshHeader();

/** work tab */

// refreshes work tab, clears countdown interval
function refreshWorkTab() {
  chrome.storage.sync.get(
    {
      isWorking: false,
      workEndTime: Date.now(),
      timeLeft: 0,
      workLength: 25,
    },
    (result) => {
      const isWorking = result.isWorking;
      const timeLeft = result.timeLeft;
      const workLength = result.workLength;

      clearInterval(countdownId);

      // paused work session
      if (timeLeft > 0) {
        displayTimeRemaining(Math.ceil(timeLeft / 1000));
      }

      // in work session
      else if (isWorking) {
        startCountdown(result.workEndTime);
      }

      // not working or in paused session
      else {
        displayTimeRemaining(workLength * 60);
      }

      hideButtons(isWorking, timeLeft);
    }
  );
}
refreshWorkTab();

// displays time in countdown based on time remaining
function displayTimeRemaining(secondsLeft) {
  let hours = Math.floor(secondsLeft / 3600);
  let minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  // display with hours section
  if (hours > 0) {
    // hours = hours < 10 ? "0" + hours : hours;
    countdownText.innerHTML = hours + ":" + minutes + ":" + seconds;
  } else {
    countdownText.innerHTML = minutes + ":" + seconds;
  }
}

// count down in work tab
function startCountdown(endTime) {
  const curTime = Date.now();
  let secondsLeft = Math.ceil((endTime - curTime) / 1000);

  function countdown() {
    displayTimeRemaining(secondsLeft);
    if (secondsLeft === 0) {
      clearInterval(countdownId);
      setTimeout(() => {
        refreshWorkTab();
        refreshHeader();
      }, 100);
    } else {
      secondsLeft--;
    }
  }
  countdown();
  countdownId = setInterval(countdown, 1000);
}

// sends message and closes popup
function sendMessageAndClosePopup(message) {
  chrome.runtime.sendMessage({ greeting: message }, () => {
    window.close();
  });
}

// sends message and refreshes work tab
function sendMessageAndUpdateWorkTab(message) {
  chrome.runtime.sendMessage({ greeting: message }, () => {
    setTimeout(() => {
      refreshWorkTab();
    }, 100);
  });
}

const workButton = document.getElementById("work-button");
workButton.addEventListener("click", () => {
  sendMessageAndClosePopup(`begin work for ${25}`);
});

const stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", () => {
  sendMessageAndUpdateWorkTab("stop work");
});

const pauseButton = document.getElementById("pause-button");
pauseButton.addEventListener("click", () => {
  sendMessageAndUpdateWorkTab("pause work");
});

const resumeButton = document.getElementById("resume-button");
resumeButton.addEventListener("click", () => {
  sendMessageAndClosePopup("resume work");
});

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  sendMessageAndUpdateWorkTab("reset work");
});

// hide pomodoro/stop button depending on if working or not
function hideButtons(isWorking, timeLeft) {
  if (isWorking) {
    workButton.style.display = "none";
    stopButton.style.display = "block";
    pauseButton.style.display = "block";
    resumeButton.style.display = "none";
    resetButton.style.display = "none";
  } else if (timeLeft > 0) {
    workButton.style.display = "none";
    stopButton.style.display = "none";
    pauseButton.style.display = "none";
    resumeButton.style.display = "block";
    resetButton.style.display = "block";
  } else {
    workButton.style.display = "block";
    stopButton.style.display = "none";
    pauseButton.style.display = "none";
    resumeButton.style.display = "none";
    resetButton.style.display = "none";
  }
}

/** shop tab */

const shopList = document.getElementById("shop-list");

/** footer */

const workDiv = document.getElementById("work");
const shopDiv = document.getElementById("shop");

const workTab = document.getElementById("work-tab");
workTab.addEventListener("click", () => {
  openWork();
});

const shopTab = document.getElementById("shop-tab");
shopTab.addEventListener("click", () => {
  openShop();
});

function openWork() {
  workDiv.style.display = "flex";
  workTab.style.backgroundColor = "green";
  shopDiv.style.display = "none";
  shopTab.style.backgroundColor = "gray";
}

function openShop() {
  workDiv.style.display = "none";
  workTab.style.backgroundColor = "gray";
  shopDiv.style.display = "flex";
  shopTab.style.backgroundColor = "green";
}

openWork();
