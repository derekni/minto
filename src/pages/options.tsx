import { useEffect, useState } from "react";
import BlockedSitesList from "../components/BlockedSitesList";

const options = () => {
  const [tabPermissions, setTabPermissions] = useState(true);
  const [notificationPermissions, setNotificationPermissions] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [chime, setChime] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setChime(new Audio("sounds/chime.mp3"));
    if (process.env.NODE_ENV === "development") {
      setIsLoading(false);
      return;
    }
    chrome.storage.sync.get(
      {
        tabPermissions: false,
        notificationPermissions: false,
        volume: 0.5,
      },
      ({
        tabPermissions: _tabPermissions,
        notificationPermissions: _notificationPermissions,
        volume: _volume,
      }) => {
        setTabPermissions(_tabPermissions);
        setNotificationPermissions(_notificationPermissions);
        setVolume(_volume);
        setIsLoading(false);
      }
    );
  }, []);

  const requestTabPermissions = () => {
    chrome.permissions.request({ permissions: ["tabs"] }, (granted) => {
      if (granted) {
        setTabPermissions(true);
        chrome.storage.sync.set({ tabPermissions: true });
      }
    });
  };

  const removeTabPermissions = () => {
    chrome.permissions.remove({ permissions: ["tabs"] });
    setTabPermissions(false);
    chrome.storage.sync.set({ tabPermissions: false });
  };

  const requestNotificationPermissions = () => {
    chrome.permissions.request(
      { permissions: ["notifications"] },
      (granted) => {
        if (granted) {
          setNotificationPermissions(true);
          chrome.storage.sync.set({ notificationPermissions: true });
        }
      }
    );
  };

  const removeNotificationPermissions = () => {
    chrome.permissions.remove({ permissions: ["notifications"] });
    setNotificationPermissions(false);
    chrome.storage.sync.set({ notificationPermissions: false });
  };

  if (isLoading) {
    return <div className="bg-green-50 min-h-screen"></div>;
  }

  return (
    <div className="bg-green-50 min-h-screen p-10 pl-14">
      <div className="font-bold text-4xl mb-4">Options</div>
      <div className="font-semibold text-xl mb-1">Alarm Volume</div>
      <input
        type="range"
        defaultValue={volume * 100}
        onMouseUp={(e) => {
          const element = e.target as HTMLInputElement;
          const updatedVolume = Number(element.value) / 100;
          setVolume(updatedVolume);
          if (chime !== null) {
            chime.volume = updatedVolume;
            chime.load();
            chime.play();
          }
          if (process.env.NODE_ENV === "development") {
            return;
          }
          chrome.storage.sync.set({ volume: updatedVolume });
        }}
      ></input>
      <div className="font-semibold text-xl mt-2">Permissions</div>
      <div>
        <input
          id="notifications"
          type="checkbox"
          className="mr-2"
          checked={notificationPermissions}
          onChange={(e) => {
            notificationPermissions
              ? removeNotificationPermissions()
              : requestNotificationPermissions();
          }}
        />
        <label className="text-base" htmlFor="notifications">
          Show notifications
        </label>
      </div>
      <div>
        <input
          id="block-sites"
          type="checkbox"
          className="mr-2 mb-4"
          checked={tabPermissions}
          onChange={(e) => {
            tabPermissions ? removeTabPermissions() : requestTabPermissions();
          }}
        />
        <label className="text-base" htmlFor="block-sites">
          Block sites when working
        </label>
      </div>
      {tabPermissions && <BlockedSitesList />}
    </div>
  );
};

export default options;
