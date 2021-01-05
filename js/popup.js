let mintInterval = null;
let myMints = null;
let countdownId = null;
let timeLeft = null;
const countdownText = document.getElementById("countdown");

// mint text value
const mintText = document.getElementById("mint-text");
function updateMintText(mints) {
  mintText.textContent = "" + Math.ceil(mints / 10);
}

// this is to reset the time and working state
// chrome.storage.sync.set({ timeLeft: 0, isWorking: false });

// refreshes values in popup, clears countdown
function refreshPopup() {
  chrome.storage.sync.get(
    {
      isWorking: false,
      workEndTime: Date.now(),
      timeLeft: 0,
      savedMints: 0,
      workLength: 25,
    },
    (result) => {
      myMints = result.savedMints;
      updateMintText(myMints);

      clearIntervals();

      const isWorking = result.isWorking;
      const timeLeft = result.timeLeft;
      const workLength = result.workLength;

      // paused work session
      if (timeLeft > 0) {
        displayTimeRemaining(Math.floor(timeLeft / 1000));
        beginUpdatingMints();
      }

      // not working
      else if (!isWorking) {
        displayTimeRemaining(workLength * 60);
        beginUpdatingMints();
      }

      // in work session
      else {
        startCountdown(result.workEndTime);
      }

      hideButtons(isWorking, timeLeft);
    }
  );
}
refreshPopup();

// set interval to decrement mints every 6 seconds
function beginUpdatingMints() {
  // clearInterval(mintInterval);
  mintInterval = setInterval(() => {
    myMints -= 1;
    updateMintText(myMints);
  }, 6000);
}

// clears all intervals
function clearIntervals() {
  clearInterval(mintInterval);
  clearInterval(countdownId);
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

// displays time in countdown based on time remaining
function displayTimeRemaining(secondsLeft) {
  let minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  countdownText.innerHTML = minutes + ":" + seconds;
}

// count down in popup
function startCountdown(endTime) {
  const curTime = Date.now();
  let secondsLeft = Math.ceil((endTime - curTime) / 1000);

  function countdown() {
    displayTimeRemaining(secondsLeft);
    console.log(secondsLeft);
    if (secondsLeft === 0) {
      clearInterval(countdownId);
      beginUpdatingMints();
    } else {
      secondsLeft--;
    }
  }
  countdown();
  countdownId = setInterval(countdown, 1000);
}

// sends message and closes popup
function sendMessageAndClose(message) {
  chrome.runtime.sendMessage({ greeting: message }, () => {
    window.close();
  });
}

// sends message and refreshes popup
function sendMessageAndUpdate(message) {
  chrome.runtime.sendMessage({ greeting: message }, () => {
    setTimeout(() => {
      refreshPopup();
    }, 100);
  });
}

// work button
const workButton = document.getElementById("work-button");
workButton.addEventListener("click", () => {
  sendMessageAndUpdate(`begin work for ${25}`);
});

const stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", () => {
  sendMessageAndUpdate("stop work");
});

const pauseButton = document.getElementById("pause-button");
pauseButton.addEventListener("click", () => {
  sendMessageAndUpdate("pause work");
});

const resumeButton = document.getElementById("resume-button");
resumeButton.addEventListener("click", () => {
  sendMessageAndUpdate("resume work");
});

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  sendMessageAndUpdate("reset work");
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

// tab functionality
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
