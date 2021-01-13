import { useEffect, useState } from "react";
import XIcon from "../icons/XIcon";

const BlockedSitesList = () => {
  const [blockedSites, setBlockedSites] = useState<string[]>([]);
  const [currentValue, setCurrentValue] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      return;
    }
    chrome.storage.sync.get(
      { blockedSites: [] },
      ({ blockedSites: _blockedSites }) => {
        setBlockedSites(_blockedSites);
      }
    );
  }, []);

  const blockSite = (siteName: string) => {
    if (siteName === "") {
      setError("You must block something!");
    } else if (!isValidURL(siteName)) {
      setError("You must put a valid URL!");
    } else if (blockedSites.includes(siteName)) {
      setError("You have already blocked this site!");
    } else {
      const updatedBlockedSites = [...blockedSites, siteName];
      setBlockedSites(updatedBlockedSites);
      setCurrentValue("");
      setError("");
      if (process.env.NODE_ENV === "development") {
        return;
      }
      chrome.storage.sync.set({ blockedSites: updatedBlockedSites });
    }
  };

  const isValidURL = (site: string) => {
    const res = site.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  };

  return (
    <div>
      <div className="font-semibold text-xl mb-2">Blocked sites</div>
      <div>
        <input
          type="text"
          className="flex-row flex-1 mb-2 mr-2 py-1 pl-2 text-base"
          placeholder="Block a site"
          value={currentValue}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              blockSite(currentValue);
            }
          }}
          onChange={(e) => {
            setCurrentValue(e.target.value);
          }}
        />
        <button
          className="bg-red-500 text-white text-base font-semibold w-20 py-1 shadow hover:shadow-lg transition-all duration-200 rounded"
          onClick={(e) => {
            blockSite(currentValue);
          }}
        >
          Block
        </button>
      </div>
      {error && <div className="text-sm">{error}</div>}
      <ul className="pl-2 text-base">
        {blockedSites.map((blockedSite) => {
          return (
            <li key={blockedSite} className="">
              {blockedSite}
              <button
                className="ml-1"
                onClick={() => {
                  const updatedBlockedSites = blockedSites.filter((site) => {
                    return site !== blockedSite;
                  });
                  setBlockedSites(updatedBlockedSites);
                  if (process.env.NODE_ENV === "development") {
                    return;
                  }
                  chrome.storage.sync.set({
                    blockedSites: updatedBlockedSites,
                  });
                }}
              >
                <XIcon />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BlockedSitesList;
