let myMints = 0;
let decrementIntervalId = null;
let isLocked = false;
const chime = new Audio("../assets/sounds/chime.mp3");

// gets saved mints and starts updating when extension starts
chrome.storage.sync.get({ savedMints: 200, isWorking: false }, (result) => {
  myMints = result.savedMints;
  if (!result.isWorking) {
    startDecrementingMints();
  }
  toggleBadge(result.isWorking);
});

// creates interval to start decrementing mints
function startDecrementingMints() {
  clearInterval(decrementIntervalId);
  decrementIntervalId = setInterval(() => {
    decrementMints();
  }, 6000);
}

// decrements mint value if not locked, sends msg to active tab if runs out
function decrementMints() {
  console.log("lock status is", isLocked);
  console.log((Math.floor(new Date().getTime() / 1000) + "").toHHMMSS());
  if (!isLocked) {
    if (myMints <= 1) {
      myMints = 0;
      blockAllSites();
      clearInterval(decrementIntervalId);
      updateMints(myMints);
    } else {
      myMints -= 1;
      updateMints(myMints);
    }
  }
}

// adds mints
function addMints(mintsToAdd) {
  myMints += mintsToAdd;
  updateMints(myMints);
}

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

// update mints value to given parameter
function updateMints(mintValue) {
  chrome.storage.sync.set({ savedMints: mintValue }, () => {
    console.log("Mints saved as", mintValue);
  });
}

// looks for active tabs to redirect when out of mints
function blockAllSites() {
  // query for active tab and redirect it
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    var activeTabId = tabs[0].id;
    chrome.tabs.sendMessage(activeTabId, { message: "check mints!" }, () => {
      console.log("sent message to tab, ran out of mints", activeTabId);
    });
  });
}

// checks for if user locks/unlocks computer
chrome.idle.setDetectionInterval(15);
chrome.idle.onStateChanged.addListener((state) => {
  if (state === "locked") {
    isLocked = true;
  } else {
    isLocked = false;
  }
});

// sets working status in storage based on current value, adds badge if working
function setWorkingStatus(working) {
  chrome.storage.sync.set({ isWorking: working }, () => {
    console.log("set working status in storage", working);
  });
  toggleBadge(working);
}

// toggles working badge
function toggleBadge(working) {
  if (working) {
    chrome.browserAction.setBadgeText({ text: "ON" });
    // chrome.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });
    chrome.browserAction.setBadgeBackgroundColor({ color: "#00873E" });
  } else {
    chrome.browserAction.setBadgeText({ text: "" });
  }
}

// check for tab switches, update pages accordingly
chrome.tabs.onActivated.addListener((tab) => {
  // sends message to switched tab
  const tabId = tab.tabId;
  chrome.tabs.sendMessage(tabId, { message: "switched tabs" }, () => {
    console.log("switched tabs", tabId);
  });
});

// listen for messages from popup for toggling work sessions
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const message = request.greeting;
  if (message === "stop work") {
    stopWork();
    console.log("new working status is false");
  } else if (message === "pause work") {
    pauseWork();
    console.log("paused work, working status is false");
  } else if (message === "resume work") {
    resumeWork();
    console.log("resumed work, working status is true");
  } else if (message === "reset work") {
    resetWork();
    console.log("reset work time");
  } else if (message.substring(0, 15) === "begin work for ") {
    const workTime = parseInt(message.substring(15));
    beginWork(workTime, workTime);
    console.log("new working status is true", workTime);
  }
  sendResponse(true);
});

// alarm listener, adds mints when work session is over, begins decrementing
chrome.alarms.onAlarm.addListener((alarm) => {
  const alarmName = alarm.name;
  const workTime = parseInt(alarmName.substring(7));
  addMints(workTime * 10);
  setWorkingStatus(false);
  startDecrementingMints();
  chime.play();

  console.log("alarm of name", alarmName);
  console.log("of time", workTime);
  console.log("added", workTime, "mints");
});

// clears interval to decrement mints, sets alarm and working status
function beginWork(workTime, alarmTime) {
  clearInterval(decrementIntervalId);
  startWorkTimer(workTime, alarmTime);
  setWorkingStatus(true);
}

// starts decrementing mints and sets working status
function stopWork() {
  chrome.alarms.clearAll();
  startDecrementingMints();
  setWorkingStatus(false);
  chrome.storage.sync.set({ timeLeft: 0 });
}

// sets timer for work, input time is number of minutes and length of timer
function startWorkTimer(time, alarmTime) {
  const curTime = Date.now();
  const endTime = curTime + 60000 * time;

  chrome.storage.sync.set({ workEndTime: endTime }, () => {
    const alarmName = "workFor" + alarmTime;
    chrome.alarms.create(alarmName, {
      when: endTime,
    });
  });
}

// pauses work, saves time remaining in chrome storage
function pauseWork() {
  chrome.storage.sync.get({ workEndTime: Date.now() }, (result) => {
    chrome.alarms.clearAll();
    const curTime = Date.now();
    const timeLeft = result.workEndTime - curTime;
    if (timeLeft > 0) {
      chrome.storage.sync.set({ timeLeft: timeLeft }, () => {
        chrome.alarms.clearAll();
        startDecrementingMints();
        setWorkingStatus(false);
        console.log("paused work, time left is", timeLeft);
      });
    } else {
      console.log("can't pause, times not valid");
    }
  });
}

// resumes work, gets time remaining from chrome storage
function resumeWork() {
  chrome.storage.sync.get({ timeLeft: 0, workLength: 25 }, (result) => {
    const timeLeft = result.timeLeft / 60_000;
    const workLength = result.workLength;
    if (timeLeft > 0) {
      beginWork(timeLeft, workLength);
      chrome.storage.sync.set({ timeLeft: 0 });
      console.log("resumed work with time left as", timeLeft);
    } else {
      console.log("time left is 0, no work to resume");
    }
  });
}

// resets timer for work
function resetWork() {
  chrome.storage.sync.set({ timeLeft: 0 });
}
