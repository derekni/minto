import { ReactElement, useEffect, useState } from "react";
import PopupContext from "../contexts/PopupContext";
import { Reward, WorkState } from "../types";

type Props = {
  children: ReactElement;
};

const PopupContextProvider = ({ children }: Props) => {
  const [workState, setWorkState] = useState<WorkState>({ status: "idle" });
  const [workLength, setWorkLength] = useState(25 * 60 * 1000);
  const [mints, setMints] = useState(0);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setIsLoading(false);
      return;
    }
    chrome.storage.sync.get(
      {
        workState: { status: "idle" },
        workLength: 25 * 60 * 1000,
        mints: 0,
        rewards: [{ name: "Watch Netflix", price: 60 }],
      },
      ({
        workState: _workState,
        workLength: _workLength,
        mints: _mints,
        rewards: _rewards,
      }) => {
        setWorkState(_workState);
        setWorkLength(_workLength);
        setMints(_mints);
        setRewards(_rewards);
        setIsLoading(false);
      }
    );

    const storageListener = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.workState !== undefined) {
        setWorkState(changes.workState.newValue);
      }
      if (changes.mints !== undefined) {
        setMints(changes.mints.newValue);
      }
      if (changes.workLength !== undefined) {
        setWorkLength(changes.workLength.newValue);
      }
      if (changes.rewards !== undefined) {
        setRewards(changes.rewards.newValue);
      }
    };
    chrome.storage.onChanged.addListener(storageListener);

    return () => {
      chrome.storage.onChanged.removeListener(storageListener);
    };
  }, []);

  const updateWorkState = (workState: WorkState) => {
    if (process.env.NODE_ENV === "development") {
      setWorkState(workState);
      return;
    }
    chrome.storage.sync.set({ workState });
  };

  const updateMints = (mints: number) => {
    if (process.env.NODE_ENV === "development") {
      setMints(mints);
      return;
    }
    chrome.storage.sync.set({ mints });
  };

  const updateWorkLength = (workLength: number) => {
    if (process.env.NODE_ENV === "development") {
      setWorkLength(workLength);
      return;
    }
    chrome.storage.sync.set({ workLength });
  };

  const updateRewards = (rewards: Reward[]) => {
    if (process.env.NODE_ENV === "development") {
      setRewards(rewards);
      return;
    }
    chrome.storage.sync.set({ rewards });
  };

  if (isLoading) {
    return null;
  }

  return (
    <PopupContext.Provider
      value={{
        workState,
        updateWorkState,
        workLength,
        updateWorkLength,
        mints,
        updateMints,
        rewards,
        updateRewards,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContextProvider;
