let myMints = null;
let countdownId = null;
let timeLeft = null;
let isWorking = null;
let rewards = [];
const countdownText = document.getElementById("countdown");

/** header */

// mint text value
const mintText = document.getElementById("mint-text");
function updateMintText(mints) {
  mintText.textContent = "" + mints;
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
      isWorking = result.isWorking;
      const timeLeft = result.timeLeft;
      const workLength = result.workLength;

      clearInterval(countdownId);

      // paused work session
      if (timeLeft > 0) {
        displayTimeRemaining(Math.ceil(timeLeft / 1000));
        toggleShopTab(true);
      }

      // in work session
      else if (isWorking) {
        startCountdown(result.workEndTime);
        toggleShopTab(false);
      }

      // default session
      else {
        displayTimeRemaining(workLength * 60);
        toggleShopTab(true);
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
const maskDiv = document.getElementById("mask");
let mask = null;

// initializes the shop tab
function initializeShop() {
  chrome.storage.sync.get({ rewards: [] }, (result) => {
    rewards = result.rewards;
    populateRewards();
  });
}
initializeShop();

// populates rewards in shop
function populateRewards() {
  let i;
  for (i = 0; i < rewards.length; i++) {
    const [reward, price] = rewards[i];
    addRewardToShop(reward, price);
  }
  addPlaceholderToShop();
}

// adds reward to shop
function addRewardToShop(reward, price) {
  const li = document.createElement("li");
  li.textContent = reward + " price: " + price;
  li.onclick = () => confirmReward(reward, price);
  li.className = "reward";
  li.style.cursor = "pointer";
  shopList.appendChild(li);
}

// adds placeholder reward at end of rewards
function addPlaceholderToShop() {
  const li = document.createElement("li");
  li.textContent = "Add reward";
  li.onclick = () => addRewardPopup();
  li.className = "placeholder-reward";
  li.style.cursor = "pointer";
  shopList.appendChild(li);
}

// adds edit button to list element
function addEditButton(li) {}

// removes reward from shop and storage
function removeReward(rewardName, rewardPrice) {
  rewards = rewards.filter(([name, price]) => {
    return name != rewardName || price != rewardPrice;
  });
  chrome.storage.sync.set({ rewards: rewards });
}

// saves reward and adds to shop
function saveAndAddReward(reward, price) {
  rewards.push([reward, price]);
  chrome.storage.sync.set({ rewards: rewards });
  addRewardToShop(reward, price);
}

// creates mask
function instantiateMask() {
  mask = document.createElement("div");
  mask.className = "mask";
  maskDiv.appendChild(mask);
}

// removes mask
function removeMask() {
  while (maskDiv.firstChild) {
    maskDiv.removeChild(maskDiv.lastChild);
  }
}

// popup to say there are not enough mints
function notifyNoMints() {
  const popup = document.createElement("div");
  popup.className = "popup";

  const message = document.createElement("p");
  message.className = "popup-text";
  message.textContent = "You do not have enough mints.";

  const closeButton = document.createElement("button");
  closeButton.onclick = () => removeMask();
  closeButton.textContent = "Close";

  popup.appendChild(message);
  popup.appendChild(closeButton);
  mask.appendChild(popup);
}

// popup to confirm purchase
function confirmRewardPopup(reward, price) {
  const popup = document.createElement("div");
  popup.className = "popup";

  const message = document.createElement("p");
  message.className = "popup-text";
  message.textContent = `Do you want to buy ${reward} for ${price} mints?`;

  const confirmButton = document.createElement("button");
  confirmButton.onclick = () => {
    purchaseReward(price);
    removeMask();
  };
  confirmButton.textContent = "confirm";

  const cancelButton = document.createElement("button");
  cancelButton.onclick = () => removeMask();
  cancelButton.textContent = "cancel";

  popup.appendChild(message);
  popup.appendChild(confirmButton);
  popup.appendChild(cancelButton);
  mask.appendChild(popup);
}

// popup to create reward
function addRewardPopup() {
  instantiateMask();
  const popup = document.createElement("div");
  popup.className = "popup";

  const message = document.createElement("p");
  message.className = "popup-text";
  message.textContent = "What reward would you like to add?";

  const rewardName = document.createElement("input");
  rewardName.placeholder = "Name";

  const rewardCost = document.createElement("input");
  rewardCost.placeholder = "Cost";

  const confirmButton = document.createElement("button");
  confirmButton.onclick = () => {
    const name = rewardName.value;
    const cost = Number(rewardCost.value);
    console.log(name, cost);
    if (name && Number.isInteger(cost)) {
      saveAndAddReward(name, cost);
      removeMask();
    } else {
      popup.remove();
      invalidRewardPopup(name, cost);
    }
  };
  confirmButton.textContent = "confirm";

  const cancelButton = document.createElement("button");
  cancelButton.onclick = () => removeMask();
  cancelButton.textContent = "cancel";

  popup.appendChild(message);
  popup.appendChild(rewardName);
  popup.appendChild(rewardCost);
  popup.appendChild(confirmButton);
  popup.appendChild(cancelButton);
  mask.appendChild(popup);
}

// error popup
function invalidRewardPopup(rewardName, rewardCost) {
  const popup = document.createElement("div");
  popup.className = "popup";

  const message = document.createElement("p");
  message.className = "popup-text";
  console.log(rewardName);
  if (!rewardName) {
    message.textContent = "You must create a name for your reward.";
  } else {
    message.textContent = "You must have an integer reward cost.";
  }

  const closeButton = document.createElement("button");
  closeButton.onclick = () => removeMask();
  closeButton.textContent = "Close";

  popup.appendChild(message);
  popup.appendChild(closeButton);
  mask.appendChild(popup);
}

// confirmation for reward
function confirmReward(reward, price) {
  instantiateMask();
  if (myMints < price) {
    notifyNoMints();
  } else {
    confirmRewardPopup(reward, price);
  }
}

// updates mints on reward purchase
function purchaseReward(price) {
  myMints -= price;
  chrome.storage.sync.set({ savedMints: myMints }, () => {
    refreshHeader();
  });
}

/** footer */

const workDiv = document.getElementById("work");
const shopDiv = document.getElementById("shop");

const workTab = document.getElementById("work-tab");
workTab.addEventListener("click", () => {
  openWork();
});

const shopTab = document.getElementById("shop-tab");

function openWork() {
  workDiv.style.display = "flex";
  workTab.style.backgroundColor = "green";
  workTab.style.cursor = "default";
  shopDiv.style.display = "none";
  shopTab.style.backgroundColor = isWorking ? "gray" : "lightgreen";
  shopTab.style.cursor = "pointer";
}
openWork();

function openShop() {
  workDiv.style.display = "none";
  workTab.style.backgroundColor = "lightgreen";
  workTab.style.cursor = "pointer";
  shopDiv.style.display = "flex";
  shopTab.style.backgroundColor = "green";
  shopTab.style.cursor = "default";
}

function toggleShopTab(open) {
  // if (open) {
  //   shopTab.addEventListener("click", openShop);
  //   shopTab.style.backgroundColor = "lightgreen";
  //   shopTab.style.cursor = "pointer";
  // } else {
  //   shopTab.removeEventListener("click", openShop);
  //   shopTab.style.backgroundColor = "gray";
  //   shopTab.style.cursor = "default";
  // }

  // for counting my extension work
  shopTab.addEventListener("click", openShop);
  shopTab.style.backgroundColor = "lightgreen";
  shopTab.style.cursor = "pointer";
}
