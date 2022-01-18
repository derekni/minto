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
    chrome.storage.sync.set({ workState });
  };

  const updateMints = (mints: number) => {
    chrome.storage.sync.set({ mints });
  };

  const updateWorkLength = (workLength: number) => {
    chrome.storage.sync.set({ workLength });
  };

  const updateRewards = (rewards: Reward[]) => {
    setRewards(rewards);
    chrome.storage.sync.set({ rewards });
  };

  const updateTodos = (todos: Todo[]) => {
    setTodos(todos);
    chrome.storage.sync.set({ todos });
  };

  const updateDailies = (dailies: Daily[]) => {
    setDailies(dailies);
    chrome.storage.sync.set({ dailies });
  };

  const updateCurrentDay = (currentDay: number) => {
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
