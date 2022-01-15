import { ReactElement, useEffect, useState } from "react";
import PopupContext from "../contexts/PopupContext";
import { Daily, Reward, Todo, WorkState } from "../types";

type Props = {
  children: ReactElement;
};

const PopupContextProvider = ({ children }: Props) => {
  const [workState, setWorkState] = useState<WorkState>({ status: "idle" });
  const [workLength, setWorkLength] = useState(25 * 60 * 1_000);
  const [mints, setMints] = useState(0);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dailies, setDailies] = useState<Daily[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [dailiesOn, setDailiesOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setIsLoading(false);
      return;
    }
    chrome.storage.sync.get(
      {
        workState: { status: "idle" },
        workLength: 25 * 60 * 1_000,
        mints: 0,
        rewards: [],
        todos: [],
        dailies: [],
        currentDay: 1,
        dailiesOn: false,
      },
      ({
        workState: _workState,
        workLength: _workLength,
        mints: _mints,
        rewards: _rewards,
        todos: _todos,
        dailies: _dailies,
        currentDay: _currentDay,
        dailiesOn: _dailiesOn,
      }) => {
        setWorkState(_workState);
        setWorkLength(_workLength);
        setMints(_mints);
        setRewards(_rewards);
        setTodos(_todos);
        setDailies(_dailies);
        setCurrentDay(_currentDay);
        setDailiesOn(_dailiesOn);
        setIsLoading(false);

        // update current date and dailies if necessary
        const currDay = new Date().getDate();
        if (_currentDay !== currDay) {
          const updatedDailies = _dailies.map((daily: Daily) => {
            return { ...daily, completed: false };
          });

          updateCurrentDay(currDay);
          updateDailies(updatedDailies);
        }
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
    setRewards(rewards);
    chrome.storage.sync.set({ rewards });
  };

  const updateTodos = (todos: Todo[]) => {
    if (process.env.NODE_ENV === "development") {
      setTodos(todos);
      return;
    }
    setTodos(todos);
    chrome.storage.sync.set({ todos });
  };

  const updateDailies = (dailies: Daily[]) => {
    if (process.env.NODE_ENV === "development") {
      setDailies(dailies);
      return;
    }
    setDailies(dailies);
    chrome.storage.sync.set({ dailies });
  };

  const updateCurrentDay = (currentDay: number) => {
    if (process.env.NODE_ENV === "development") {
      setCurrentDay(currentDay);
      return;
    }
    setCurrentDay(currentDay);
    chrome.storage.sync.set({ currentDay });
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
        todos,
        updateTodos,
        dailies,
        updateDailies,
        currentDay,
        updateCurrentDay,
        dailiesOn,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContextProvider;
