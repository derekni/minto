import { useEffect, useState } from "react";
import BlockedSitesList from "../components/BlockedSitesList";
import Head from "next/head";

const options = () => {
  const [tabPermissions, setTabPermissions] = useState(true);
  const [notificationPermissions, setNotificationPermissions] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [chime, setChime] = useState<HTMLAudioElement | null>(null);
  const [dailiesOn, setDailiesOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setChime(new Audio("sounds/chime.mp3"));
    chrome.storage.sync.get(
      {
        tabPermissions: false,
        notificationPermissions: false,
        volume: 0.5,
        dailiesOn: false,
      },
      ({
        tabPermissions: _tabPermissions,
        notificationPermissions: _notificationPermissions,
        volume: _volume,
        dailiesOn: _dailiesOn,
      }) => {
        setTabPermissions(_tabPermissions);
        setNotificationPermissions(_notificationPermissions);
        setVolume(_volume);
        setDailiesOn(_dailiesOn);
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

  const updateDailiesOn = (dailiesOn: boolean) => {
    setDailiesOn(dailiesOn);
    chrome.storage.sync.set({ dailiesOn });
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Settings</title>
        </Head>
        <div className="bg-gray-50 min-h-screen"></div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <div className="bg-gray-50 flex flex-col min-h-screen py-9 px-14">
        <div className="flex-1">
          <div className="font-bold text-4xl mb-4">Settings</div>
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
              chrome.storage.sync.set({ volume: updatedVolume });
            }}
          ></input>
          <div className="font-semibold text-xl mt-2">Toggles</div>
          <div>
            <input
              id="dailies"
              type="checkbox"
              className="mr-2"
              checked={dailiesOn}
              onChange={(e) => {
                updateDailiesOn(e.target.checked);
              }}
            />
            <label className="text-base" htmlFor="dailies">
              Show dailies tab in popup
            </label>
          </div>
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
              Show alarm notifications in Notification Center
            </label>
          </div>
          <div>
            <input
              id="block-sites"
              type="checkbox"
              className="mr-2 mb-4"
              checked={tabPermissions}
              onChange={(e) => {
                tabPermissions
                  ? removeTabPermissions()
                  : requestTabPermissions();
              }}
            />
            <label className="text-base" htmlFor="block-sites">
              Block sites when working
            </label>
          </div>
          <BlockedSitesList />
        </div>
        <div className="flex justify-center">
          <a
            href="https://www.buymeacoffee.com/derekni8"
            target="_blank"
            className=""
          >
            <img
              src="img/green-coffee.png"
              alt="Buy Me A Coffee"
              className="h-12 w-42 "
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default options;
