import React, { useContext, useState } from "react";
import PopupContextProvider from "../components/PopupContextProvider";
import PopupHeader from "../components/PopupHeader";
import ShopTab from "../components/ShopTab";
import Tab from "../components/Tab";
import WorkTab from "../components/WorkTab";
import PopupContext from "../contexts/PopupContext";

type Tab = "work" | "shop";

const Popup = () => {
  const [currentTab, setCurrentTab] = useState<Tab>("work");
  const { workState } = useContext(PopupContext);

  return (
    <div className="flex flex-col h-64 w-64">
      <PopupHeader />
      <div className="flex flex-1 flex-col">
        {currentTab === "work" && <WorkTab />}
        {currentTab === "shop" && <ShopTab />}
      </div>

      <div className="flex h-10">
        <Tab
          label="Work"
          onClick={() => setCurrentTab("work")}
          isActive={currentTab === "work"}
          isDisabled={false}
        />

        <Tab
          label="Shop"
          onClick={() => setCurrentTab("shop")}
          isActive={currentTab === "shop"}
          isDisabled={workState.status === "working"}
        />
      </div>
    </div>
  );
};

const PopupContainer = () => (
  <PopupContextProvider>
    <Popup />
  </PopupContextProvider>
);

export default PopupContainer;
