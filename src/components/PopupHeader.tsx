import React, { useContext } from "react";
import PopupContext from "../contexts/PopupContext";
import SettingsIcon from "../icons/SettingsIcon";

const PopupHeader = () => {
  const { mints } = useContext(PopupContext);

  return (
    <div className="flex justify-between bg-green-500 px-2.5 h-9">
      <div className="flex items-center">
        <img className="mr-1.5 w-5 h-5" src="img/mint-128x128.png" />
        <div className="text-lg font-semibold text-white">{mints}</div>
      </div>
      <button onClick={() => chrome.runtime.openOptionsPage()}>
        <SettingsIcon />
      </button>
    </div>
  );
};

export default PopupHeader;
