var blockedSites = [];
var blockButton = document.getElementById("block-button");

// populates list with saved blocked sites
chrome.storage.sync.get({ sites: [] }, function (result) {
  blockedSites = result.sites;
  populateBlockedSites();
});

// adds list of blocked sites to html
function populateBlockedSites() {
  for (i = 0; i < blockedSites.length; i++) {
    var li = document.createElement("li");
    var site = blockedSites[i];
    li.textContent = site;
    addDeleteButton(li);
    document.getElementById("blocked-sites").appendChild(li);
  }
}

// adds delete button for a row in the list
function addDeleteButton(li) {
  var button = document.createElement("button");
  button.innerHTML = "\u00D7";
  button.addEventListener("click", function () {
    var parent = this.parentElement;
    var site = parent.textContent.slice(0, -1);
    deleteBlockedSite(site);
    parent.style.display = "none";
  });
  li.appendChild(button);
}

// deletes a specified site from blocked sites and saves new list
function deleteBlockedSite(site) {
  for (var i = 0; i < blockedSites.length; i++) {
    if (blockedSites[i] === site) {
      blockedSites.splice(i, 1);
      i--;
    }
  }
  saveSites();
}

// clicking on block button will add a blocked site and save it
blockButton.addEventListener("click", function blockSite() {
  var li = document.createElement("li");
  var siteName = document.getElementById("user-input").value;
  var text = document.createTextNode(siteName);
  li.appendChild(text);
  addDeleteButton(li);
  if (siteName === "") {
    console.log("You must block something!");
  } else if (!isValidURL(siteName)) {
    console.log("You must put a valid URL!");
  } else if (blockedSites.includes(siteName)) {
    console.log("You have already blocked this site!");
  } else {
    document.getElementById("blocked-sites").appendChild(li);
    blockedSites.push(siteName);
    saveSites();
    document.getElementById("user-input").value = "";
  }
});

// pressing enter in text box will be same as clicking block button
document
  .getElementById("user-input")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      blockButton.click();
    }
  });

// saves blocked sites to chrome storage
function saveSites() {
  chrome.storage.sync.set(
    {
      sites: blockedSites,
    },
    function () {
      console.log("sites saved as " + blockedSites);
    }
  );
}

// checks if valid URL (not perfect, simple regex)
function isValidURL(site) {
  var res = site.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}
