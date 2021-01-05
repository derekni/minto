let myMints = 0;
let blockedSites = [];
let isWorking = false;
const id = chrome.runtime.id;
const blockUrl = `chrome-extension://${id}/html/blocked.html`;
const chime = new Audio("../assets/sounds/chime.mp3");

// gets saved mints and blocked sites on extension start
chrome.storage.sync.get(
  { savedMints: 0, isWorking: false, blockedSites: [] },
  (result) => {
    myMints = result.savedMints;
    blockedSites = result.blockedSites;
    isWorking = result.isWorking;
    toggleBadge(isWorking);
  }
);

// adds mints
function addMints(mintsToAdd) {
  myMints += mintsToAdd;
  updateMints(myMints);
}

// update mints value to given parameter
function updateMints(mintValue) {
  chrome.storage.sync.set({ savedMints: mintValue }, () => {
    console.log("Mints saved as", mintValue);
  });
}

// sets working status in storage and variable, updates badge
function setWorkingStatus(working) {
  isWorking = working;
  chrome.storage.sync.set({ isWorking: working });
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

// updates blocked sites
function updateBlockedSites() {
  chrome.storage.sync.get({ blockedSites: [] }, (result) => {
    blockedSites = result.blockedSites;
  });
}

// redirects if current site is blocked and is working
function blockSite(tabId, url) {
  if (url && isWorking) {
    for (let i = 0; i < blockedSites.length; i++) {
      if (url.includes(blockedSites[i])) {
        chrome.tabs.update(tabId, { url: blockUrl });
      }
    }
  }
}

// check for tab switches
chrome.tabs.onActivated.addListener((tab) => {
  const tabId = tab.tabId;
  chrome.tabs.get(tabId, (tab) => {
    const url = tab.url;
    blockSite(tabId, url);
  });
});

// check when new tab or page is opened
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  const url = changeInfo.url;
  blockSite(tabId, url);
});

// listen for messages from popup for toggling work sessions
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const message = request.greeting;
  if (message === "updated blocked sites") {
    updateBlockedSites();
  } else if (message === "stop work") {
    stopWork();
  } else if (message === "pause work") {
    pauseWork();
  } else if (message === "resume work") {
    resumeWork();
  } else if (message === "reset work") {
    resetWork();
  } else if (message.substring(0, 15) === "begin work for ") {
    const workTime = parseInt(message.substring(15));
    beginWork(workTime, workTime);
  }
  sendResponse(true);
});

// alarm listener, adds mints when work session is over, begins decrementing
chrome.alarms.onAlarm.addListener((alarm) => {
  const alarmName = alarm.name;
  const workTime = parseInt(alarmName.substring(7));
  addMints(workTime * 10);
  setWorkingStatus(false);
  chime.play();
});

// clears interval to decrement mints, sets alarm and working status
function beginWork(workTime, alarmTime) {
  startWorkTimer(workTime, alarmTime);
  setWorkingStatus(true);
}

// starts decrementing mints and sets working status
function stopWork() {
  chrome.alarms.clearAll();
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
        setWorkingStatus(false);
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
    } else {
      console.log("time left is 0, no work to resume");
    }
  });
}

// resets timer for work
function resetWork() {
  chrome.storage.sync.set({ timeLeft: 0 });
}
