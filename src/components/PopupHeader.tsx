import React, { useContext } from "react";
import PopupContext from "../contexts/PopupContext";
import SettingsIcon from "../icons/SettingsIcon";
import BriefcaseIcon from "../icons/BriefcaseIcon";
import GoldBriefcaseIcon from "../icons/GoldBriefcaseIcon";

const PopupHeader = (props: {
  shopClick: () => void;
  inShop: boolean;
}) => {
  const { mints } = useContext(PopupContext);
  let buttonClassName = "pr-1";

  return (
    <div className="flex justify-between bg-green-500 px-2.5 h-9">
      <div className="flex items-center">
        <img className="mr-1.5 w-4 h-4" src="img/mint-128x128.png" />
        <div className="text-lg font-semibold text-white">{mints}</div>
      </div>
      <div className="flex items-center">
        <button
          onClick={props.shopClick}
          className={buttonClassName}
        >
          {!props.inShop && <BriefcaseIcon />}
          {props.inShop && <GoldBriefcaseIcon />}
        </button>
        <button onClick={() => chrome.runtime.openOptionsPage()}>
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
};

export default PopupHeader;
