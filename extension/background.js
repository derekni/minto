// Manifest V3 service worker - state is not persistent; use chrome.storage and chrome.alarms.

const WORK_ALARM_NAME = "workTimer";
const blockUrl = chrome.runtime.getURL("out/blocked.html");

// Ensures offscreen document exists, then sends play message (MV3: service workers can't use Audio).
async function playChime(volume = 0.5) {
  try {
    await chrome.offscreen.createDocument({
      url: chrome.runtime.getURL("offscreen.html"),
      reasons: ["AUDIO_PLAYBACK"],
      justification: "Play timer completion chime",
    });
  } catch (e) {
    // Document may already exist
  }
  chrome.runtime.sendMessage({ action: "playChime", volume });
}

// initializes values and adds option to context menu on install
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.storage.sync.set({
      mints: 0,
      lifetimeMints: 0,
      workState: { status: "idle" },
      blockedSites: ["facebook.com", "youtube.com", "reddit.com"],
      workLength: 25 * 60 * 1_000,
      rewards: [
        {
          id: 0,
          name: "Watch TV",
          price: 30,
        },
      ],
      nextRewardId: 1,
      todos: [
        {
          id: 0,
          name: "Make your first todo",
          value: 5,
        },
      ],
      nextTodoId: 1,
      dailies: [
        {
          id: 0,
          name: "Work out",
          value: 25,
          completed: false,
        },
      ],
      nextDailyId: 1,
      tabPermissions: false,
      notificationPermissions: false,
      volume: 0.5,
    });
    chrome.tabs.create({ url: chrome.runtime.getURL("out/welcome.html") });
  }
});

// Restore state from storage and schedule alarm if work session is active (service worker may have restarted)
chrome.storage.sync.get(
  {
    mints: 0,
    lifetimeMints: 0,
    workState: { status: "idle" },
    blockedSites: [],
    workLength: 25 * 60 * 1_000,
    tabPermissions: false,
    notificationPermissions: false,
    volume: 0.5,
    permablock: false,
  },
  (
    {
      mints: _mints,
      lifetimeMints: _lifetimeMints,
      blockedSites: _blockedSites,
      workState: _workState,
      workLength: _workLength,
      tabPermissions: _tabPermissions,
      notificationPermissions: _notificationPermissions,
      volume: _volume,
      permablock: _permablock,
    }
  ) => {
    if (_workState.status === "working") {
      const timeLeft = _workState.workEndTime - Date.now();
      if (timeLeft <= 0) {
        processAlarm();
      } else {
        chrome.alarms.create(WORK_ALARM_NAME, { when: Date.now() + timeLeft });
      }
    }
    toggleBadge(_workState);
    updateTabPermissions(_tabPermissions);
  }
);

// Adds mints and persists (called from processAlarm with values from storage)
function addMintsAndPersist(mintsToAdd) {
  chrome.storage.sync.get(
    { mints: 0, lifetimeMints: 0 },
    ({ mints, lifetimeMints }) => {
      mints += mintsToAdd;
      lifetimeMints += mintsToAdd;
      chrome.storage.sync.set({ mints, lifetimeMints });
    }
  );
}

// Toggles working badge (MV3: chrome.action instead of browserAction)
function toggleBadge(workState) {
  if (workState && workState.status === "working") {
    chrome.action.setBadgeText({ text: "ON" });
    chrome.action.setBadgeBackgroundColor({ color: "#10b981" });
  } else {
    chrome.action.setBadgeText({ text: "" });
  }
}

// Listen for work timer alarm (MV3: alarms persist across service worker restarts)
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === WORK_ALARM_NAME) {
    processAlarm();
  }
});

// Listen for changes to work state, tab permissions, and blocked sites
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "sync") return;

  if (changes.workState && changes.workState.newValue) {
    const workState = changes.workState.newValue;
    const oldState = changes.workState.oldValue;

    toggleBadge(workState);

    if (workState.status === "working") {
      const timeLeft = workState.workEndTime - Date.now();
      chrome.alarms.create(WORK_ALARM_NAME, { when: Date.now() + timeLeft });
      chrome.storage.sync.get(["tabPermissions"], ({ tabPermissions }) => {
        if (tabPermissions) {
          chrome.tabs.query({ active: true }, (tabs) => {
            tabs.forEach((tab) => blockSite(tab.id, tab.url));
          });
        }
      });
    } else if (oldState && oldState.status === "working") {
      chrome.alarms.clear(WORK_ALARM_NAME);
      chrome.storage.sync.get(["tabPermissions"], ({ tabPermissions }) => {
        if (tabPermissions) {
          chrome.tabs.query({ url: blockUrl }, (tabs) => {
            tabs.forEach((tab) => chrome.tabs.goBack(tab.id));
          });
        }
      });
    }
  }

  if (changes.tabPermissions) {
    updateTabPermissions(changes.tabPermissions.newValue);
  }
  if (changes.blockedSites?.newValue) {
    chrome.storage.sync.get(["workState", "tabPermissions"], (data) => {
      if (data.tabPermissions && data.workState?.status === "working") {
        chrome.tabs.query({ active: true }, (tabs) => {
          tabs.forEach((tab) => blockSite(tab.id, tab.url));
        });
      }
    });
  }
});

async function processAlarm() {
  const { workLength, notificationPermissions, volume } =
    await chrome.storage.sync.get({
      workLength: 25 * 60 * 1_000,
      notificationPermissions: false,
      volume: 0.5,
    });
  const workLengthInMinutes = Math.floor(workLength / 60_000);

  addMintsAndPersist(workLengthInMinutes);
  chrome.storage.sync.set({ workState: { status: "idle" } });
  toggleBadge({ status: "idle" });

  if (notificationPermissions) {
    chrome.notifications.create({
      iconUrl: chrome.runtime.getURL("out/img/mint-128x128.png"),
      message: `Your work timer for ${workLengthInMinutes} minutes is over.`,
      title: "Break time!",
      type: "basic",
    });
  }
  playChime(volume);
}

chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-work") {
    chrome.storage.sync.get(["workState"], ({ workState }) => {
      workState?.status === "working" ? pauseWork() : startWork();
    });
  } else if (command === "reset-mints") {
    chrome.storage.sync.set({ mints: 0 });
  }
});

function startWork() {
  chrome.storage.sync.get(
    { workState: { status: "idle" }, workLength: 25 * 60 * 1_000 },
    ({ workState, workLength }) => {
      const curTime = Date.now();
      let workEndTime = null;
      if (workState.status === "idle") {
        workEndTime = curTime + workLength;
      } else if (workState.status === "paused") {
        workEndTime = curTime + workState.pausedTimeLeft;
      } else {
        return;
      }
      const newState = { status: "working", workEndTime };
      chrome.storage.sync.set({ workState: newState });
      toggleBadge(newState);
    }
  );
}

function pauseWork() {
  chrome.storage.sync.get(["workState"], ({ workState }) => {
    if (workState?.status !== "working") return;
    const pausedTimeLeft = workState.workEndTime - Date.now();
    chrome.storage.sync.set({
      workState: { status: "paused", pausedTimeLeft },
    });
    chrome.alarms.clear(WORK_ALARM_NAME);
  });
}

// Blocked sites with tab permissions
function getBlockedSites(callback) {
  chrome.storage.sync.get({ blockedSites: [] }, ({ blockedSites }) =>
    callback(blockedSites)
  );
}

const addBlockedSite = (info) => {
  const url = info.pageUrl;
  let start = null;
  if (url.includes("www.")) {
    start = url.indexOf("www.") + 3;
  } else {
    start = url.indexOf("://") + 3;
  }
  const end = url.indexOf("/", start);
  const newBlockedSite = end ? url.substring(start, end) : url.substring(start);
  chrome.storage.sync.get({ blockedSites: [] }, ({ blockedSites }) => {
    if (!blockedSites.includes(newBlockedSite)) {
      blockedSites.push(newBlockedSite);
      chrome.storage.sync.set({ blockedSites });
    }
  });
};

function blockSite(tabId, url) {
  getBlockedSites((blockedSites) => {
    chrome.storage.sync.get(["workState", "permablock"], (data) => {
      const workState = data.workState || { status: "idle" };
      const permablock = data.permablock || false;
      if (
        url &&
        (workState.status === "working" || permablock) &&
        blockedSites.some((site) => url.includes(site))
      ) {
        chrome.tabs.update(tabId, { url: blockUrl });
      }
    });
  });
}

const tabsActivatedListener = (tab) => {
  chrome.tabs.get(tab.tabId, (t) => {
    if (t?.url) blockSite(tab.tabId, t.url);
  });
};

const tabsUpdatedListener = (tabId, changeInfo) => {
  if (changeInfo.url) blockSite(tabId, changeInfo.url);
};

const contextMenuListener = (info) => {
  if (info.menuItemId === "Block site") {
    addBlockedSite(info);
  }
};

function updateTabPermissions(permissions) {
  if (permissions) {
    chrome.tabs.onActivated.addListener(tabsActivatedListener);
    chrome.tabs.onUpdated.addListener(tabsUpdatedListener);
    chrome.contextMenus.onClicked.addListener(contextMenuListener);
    chrome.contextMenus.removeAll(() => {
      chrome.contextMenus.create({
        id: "Block site",
        title: "Block this site when working",
        documentUrlPatterns: ["http://*/*", "https://*/*"],
      });
    });
  } else {
    chrome.tabs.onActivated.removeListener(tabsActivatedListener);
    chrome.tabs.onUpdated.removeListener(tabsUpdatedListener);
    chrome.contextMenus.onClicked.removeListener(contextMenuListener);
    chrome.contextMenus.removeAll();
  }
}
