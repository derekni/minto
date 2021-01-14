let mints = 0;
let lifetimeMints = 0;
let blockedSites = [];
let workState = { status: "idle" };
let tabPermissions = false;
let notificationPermissions = false;
let volume = 0.5;
const id = chrome.runtime.id;
const blockUrl = `chrome-extension://${id}/out/blocked.html`;
const chime = new Audio("../out/sounds/chime.mp3");

// initializes values and adds option to context menu on install
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.storage.sync.set({
      mints: 0,
      lifetimeMints: 0,
      workState: { status: "idle" },
      blockedSites: [],
      workLength: 25 * 60 * 1000,
      rewards: [{ id: -1, name: "Watch Netflix", price: 50 }],
      nextRewardId: 0,
      tabPermissions: false,
      notificationPermissions: false,
      volume: 0.5,
    });
    chrome.runtime.openOptionsPage();
  }
});

// gets saved mints and blocked sites when background script runs
chrome.storage.sync.get(
  {
    mints: 0,
    lifetimeMints: 0,
    workState: { status: "idle" },
    blockedSites: [],
    tabPermissions: false,
    notificationPermissions: false,
    volume: 0.5,
  },
  ({
    mints: _mints,
    lifetimeMints: _lifetimeMints,
    blockedSites: _blockedSites,
    workState: _workState,
    tabPermissions: _tabPermissions,
    notificationPermissions: _notificationPermissions,
    volume: _volume,
  }) => {
    mints = _mints;
    lifetimeMints = _lifetimeMints;
    blockedSites = _blockedSites;
    workState = _workState;
    tabPermissions = _tabPermissions;
    notificationPermissions = _notificationPermissions;
    volume = _volume;
    toggleBadge(workState);
    updateTabPermissions(tabPermissions);
    chime.volume = volume;
  }
);

// adds mints
const addMints = (mintsToAdd) => {
  mints += mintsToAdd;
  lifetimeMints += mintsToAdd;

  chrome.storage.sync.set({ mints, lifetimeMints });
};

// toggles working badge
const toggleBadge = (workState) => {
  if (workState.status === "working") {
    chrome.browserAction.setBadgeText({ text: "ON" });
    // chrome.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });
    chrome.browserAction.setBadgeBackgroundColor({ color: "#00873E" });
  } else {
    chrome.browserAction.setBadgeText({ text: "" });
  }
};

// listens for changes to work state, tab permissions, and blocked sites
chrome.storage.onChanged.addListener((changes) => {
  if (changes.workState) {
    workState = changes.workState.newValue;
    toggleBadge(workState);
    if (tabPermissions && workState.status === "working") {
      chrome.tabs.query({ active: true }, (tabs) => {
        for (let i = 0; i < tabs.length; i++) {
          blockSite(tabs[i].id, tabs[i].url);
        }
      });
    } else if (
      tabPermissions &&
      changes.workState.oldValue.status === "working"
    ) {
      chrome.tabs.query({ url: blockUrl }, (tabs) => {
        for (let i = 0; i < tabs.length; i++) {
          chrome.tabs.goBack(tabs[0].id);
        }
      });
    }
  }
  if (changes.tabPermissions) {
    tabPermissions = changes.tabPermissions.newValue;
    updateTabPermissions(tabPermissions);
  }
  if (changes.blockedSites) {
    blockedSites = changes.blockedSites.newValue;
    if (tabPermissions && workState.status === "working") {
      chrome.tabs.query({ active: true }, (tabs) => {
        for (let i = 0; i < tabs.length; i++) {
          blockSite(tabs[i].id, tabs[i].url);
        }
      });
    }
  }
  if (changes.notificationPermissions) {
    notificationPermissions = changes.notificationPermissions.newValue;
  }
  if (changes.volume) {
    volume = changes.volume.newValue;
    chime.volume = volume;
  }
});

// alarm listener, adds mints when work session is over, begins decrementing
chrome.alarms.onAlarm.addListener((alarm) => {
  const alarmName = alarm.name;
  const workTime = parseInt(alarmName.substring(7));

  addMints(workTime);
  workState = { status: "idle" };
  chrome.storage.sync.set({ workState });
  toggleBadge(workState);
  if (notificationPermissions) {
    chrome.notifications.create({
      iconUrl: "../out/img/mint.png",
      message: `Your work timer for ${workTime} minutes is over.`,
      title: "Break time!",
      type: "basic",
    });
  }
  chime.play();

  console.log("alarm went off", alarm);
});

chrome.commands.onCommand.addListener(function (command) {
  if (command === "toggle-work") {
    workState.status === "working" ? pauseWork() : startWork();
  }
});

const startWork = () => {
  chrome.storage.sync.get({ workLength: 25 * 60_000 }, ({ workLength }) => {
    const curTime = Date.now();
    let workEndTime = null;
    if (workState.status === "idle") {
      workEndTime = curTime + workLength;
    } else if (workState.status === "paused") {
      workEndTime = curTime + workState.pausedTimeLeft;
    } else {
      throw new Error("tried to start work, not from idle or paused");
    }

    workState = { status: "working", workEndTime };
    chrome.storage.sync.set({ workState });

    const alarmName = "workFor" + Math.floor(workLength / 60_000);
    chrome.alarms.create(alarmName, { when: workEndTime });
    toggleBadge(workState);

    console.log("started work, endtime is", workEndTime);
  });
};

const pauseWork = () => {
  chrome.alarms.clearAll();
  if (workState.status !== "working")
    throw new Error("cannot pause if not working");
  const curTime = Date.now();
  const pausedTimeLeft = workState.workEndTime - curTime;
  workState = { status: "paused", pausedTimeLeft };
  chrome.storage.sync.set({ workState });
  console.log("paused time, time left is", pausedTimeLeft / 60_000);
};

// blocked sites with tab permissions

const addBlockedSite = (info) => {
  console.log(info, "info");
  const url = info.pageUrl;
  const start = url.indexOf("://") + 3;
  const end = url.indexOf("/", start);
  const newBlockedSite = end ? url.substring(start, end) : url.substring(start);
  if (!blockedSites.includes(newBlockedSite)) {
    blockedSites.push(newBlockedSite);
    chrome.storage.sync.set({ blockedSites });
  }
};

const blockSite = (tabId, url) => {
  if (url && workState.status === "working") {
    for (let i = 0; i < blockedSites.length; i++) {
      if (url.includes(blockedSites[i])) {
        chrome.tabs.update(tabId, { url: blockUrl });
      }
    }
  }
};

const tabsActivatedListener = (tab) => {
  const tabId = tab.tabId;
  chrome.tabs.get(tabId, (tab) => {
    const url = tab.url;
    blockSite(tabId, url);
  });
};

const tabsUpdatedListener = (tabId, changeInfo) => {
  const url = changeInfo.url;
  blockSite(tabId, url);
};

const contextMenuListener = (info) => {
  console.log("context menu info", info);
  if (info.menuItemId === "Block site") {
    addBlockedSite(info);
  }
};

const updateTabPermissions = (permissions) => {
  if (permissions) {
    chrome.tabs.onActivated.addListener(tabsActivatedListener);
    chrome.tabs.onUpdated.addListener(tabsUpdatedListener);
    chrome.contextMenus.onClicked.addListener(contextMenuListener);

    chrome.contextMenus.create({
      id: "Block site",
      title: "Block this site when working",
      documentUrlPatterns: ["http://*/*", "https://*/*"],
    });
  } else {
    chrome.tabs.onActivated.removeListener(tabsActivatedListener);
    chrome.tabs.onUpdated.removeListener(tabsUpdatedListener);
    chrome.contextMenus.onClicked.removeListener(contextMenuListener);

    chrome.contextMenus.removeAll();
  }
};