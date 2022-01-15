import React, { useContext, useState } from "react";
import DailiesTab from "../components/DailiesTab";
import PopupContextProvider from "../components/PopupContextProvider";
import PopupHeader from "../components/PopupHeader";
import ShopTab from "../components/ShopTab";
import Tab from "../components/Tab";
import TodoTab from "../components/TodoTab";
import WorkTab from "../components/WorkTab";
import PopupContext from "../contexts/PopupContext";

export type TabId = "work" | "shop" | "todo" | "dailies";

const Popup = () => {
  const [currentTab, setCurrentTab] = useState<TabId>("work");
  const { workState, dailiesOn } = useContext(PopupContext);

  return (
    <div className="flex flex-col h-72 w-64">
      <PopupHeader
        shopClick={() => setCurrentTab("shop")}
        inShop={currentTab == "shop"}
      />
      <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
        {currentTab === "work" && <WorkTab />}
        {currentTab === "todo" && <TodoTab />}
        {currentTab === "dailies" && <DailiesTab />}
        {currentTab === "shop" && <ShopTab />}
      </div>

      <div className="flex h-10 text-base">
        <Tab
          id="work"
          label="Work"
          onClick={() => setCurrentTab("work")}
          isActive={currentTab === "work"}
          isDisabled={false}
        />

        <Tab
          id="todo"
          label="Todo"
          onClick={() => setCurrentTab("todo")}
          isActive={currentTab === "todo"}
          isDisabled={workState.status === "working"}
        />

        {dailiesOn && (
          <Tab
            id="dailies"
            label="Dailies"
            onClick={() => setCurrentTab("dailies")}
            isActive={currentTab === "dailies"}
            isDisabled={workState.status === "working"}
          />
        )}
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
