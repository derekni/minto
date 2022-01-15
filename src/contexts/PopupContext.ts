import { createContext } from "react";
import { Reward, WorkState, Todo, Daily } from "../types";

type PopupContextType = {
  workState: WorkState;
  updateWorkState: (workState: WorkState) => void;
  workLength: number;
  updateWorkLength: (workLength: number) => void;
  mints: number;
  updateMints: (mints: number) => void;
  rewards: Reward[];
  updateRewards: (rewards: Reward[]) => void;
  todos: Todo[];
  updateTodos: (todos: Todo[]) => void;
  dailies: Daily[];
  updateDailies: (dailies: Daily[]) => void;
  currentDay: number;
  updateCurrentDay: (newDay: number) => void;
  dailiesOn: boolean;
};

const PopupContext = createContext<PopupContextType>({
  workState: { status: "idle" },
  updateWorkState: () => {},
  workLength: 25 * 60 * 1_000,
  updateWorkLength: () => {},
  mints: 0,
  updateMints: () => {},
  rewards: [],
  updateRewards: () => {},
  todos: [],
  updateTodos: () => {},
  dailies: [],
  updateDailies: () => {},
  currentDay: 1,
  updateCurrentDay: () => {},
  dailiesOn: false,
});

export default PopupContext;
